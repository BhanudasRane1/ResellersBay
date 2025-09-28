from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import transaction
from .models import Branch, Year, BookType, BookSet, Book, Seller,Contact,BookInquiry
from .serializers import BranchSerializer, YearSerializer, BookTypeSerializer, BookSetSerializer,ContactSerializer,BookInquirySerializer
import re
import json
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated

from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes
from rest_framework.views import APIView
from django.core.mail import EmailMultiAlternatives

from rest_framework.permissions import SAFE_METHODS, BasePermission

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class BranchViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer


class YearViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Year.objects.all()
    serializer_class = YearSerializer


class BookTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BookType.objects.all()
    serializer_class = BookTypeSerializer


class BookSetViewSet(viewsets.ModelViewSet):
    queryset = BookSet.objects.prefetch_related("books").all()
    serializer_class = BookSetSerializer
    
    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [AllowAny()]  # anyone can GET
        return [IsAuthenticated()]  # POST/PUT/DELETE require login
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
    # 🔹 Helper to parse nested JSON strings from request.data
    def _extract_nested(self, data):
        seller = data.get("seller")
        books = data.get("books")
        if isinstance(seller, str):
            seller = json.loads(seller)
        if isinstance(books, str):
            books = json.loads(books)
        return seller, books

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        try:
            data = request.data

            # --- Seller ---
            seller_obj, _ = Seller.objects.get_or_create(
                email=data.get("seller_email"),
                defaults={
                    "name": data.get("seller_name", ""),
                    "mobile": data.get("seller_mobile", ""),
                },
            )

            # --- BookSet ---
            bookset = BookSet.objects.create(
                seller=seller_obj,
                branch_id=data.get("branch"),
                year_id=data.get("year"),
                description=data.get("description", ""),
            )

            if "bookset_image" in request.FILES:
                bookset.image = request.FILES["bookset_image"]
                bookset.save()

            # --- Books (handle both JSON & multipart) ---
            book_pattern = re.compile(r"^books\[(\d+)\]\[(\w+)\]$")
            books_dict = {}

            # text fields
            for key, value in data.items():
                match = book_pattern.match(key)
                if match:
                    idx, field = match.groups()
                    books_dict.setdefault(idx, {})[field] = value

            # file uploads
            for key, file in request.FILES.items():
                match = book_pattern.match(key)
                if match:
                    idx, field = match.groups()
                    if field == "image":
                        books_dict.setdefault(idx, {})["image"] = file

            for _, b in books_dict.items():
                Book.objects.create(
                    bookset=bookset,
                    name=b.get("name"),
                    book_type_id=b.get("book_type"),
                    price=b.get("price") or 0,
                    image=b.get("image"),
                )

            # --- Response ---
            serializer = self.get_serializer(bookset)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            import traceback

            traceback.print_exc()
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()

        seller_data, books_data = self._extract_nested(request.data)

        # --- Update seller ---
        if seller_data:
            seller = instance.seller
            seller.name = seller_data.get("name", seller.name)
            seller.email = seller_data.get("email", seller.email)
            seller.mobile = seller_data.get("mobile", seller.mobile)
            seller.save()

        # --- Update BookSet fields ---
        if "branch" in request.data:
            instance.branch_id = request.data.get("branch")
        if "year" in request.data:
            instance.year_id = request.data.get("year")
        if "description" in request.data:
            instance.description = request.data.get("description")
        if "image" in request.FILES:
            instance.image = request.FILES.get("image")
        instance.save()

        # --- Replace books if provided ---
        if books_data is not None:
            instance.books.all().delete()
            for idx, b in enumerate(books_data):
                book_image = (
                    request.FILES.get(f"books[{idx}].image")
                    or request.FILES.get(f"book_image_{idx}")
                )
                Book.objects.create(
                    bookset=instance,
                    name=b.get("name"),
                    book_type_id=b.get("book_type"),
                    price=b.get("price") or 0,
                    image=book_image,
                )

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by("-created_at")
    serializer_class = ContactSerializer

class BookInquiryViewSet(viewsets.ModelViewSet):
    queryset = BookInquiry.objects.all()
    serializer_class = BookInquirySerializer
    permission_classes = [IsAuthenticated]

class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        if not all([data.get('username'), data.get('email'), data.get('password')]):
            return Response({"error": "All fields required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=data['username']).exists():
            return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            first_name=data.get('fullName', "")
        )

        # issue JWT tokens right after signup
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "fullName": user.first_name
            },
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)

class PasswordResetView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Avoid exposing valid emails
            return Response({'detail': 'If an account exists, you will receive a password reset email.'})

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset_link = f"http://localhost:5173/password-reset-confirm/{uid}/{token}/"

        # Render HTML and text versions
        html_message = render_to_string("emails/password_reset_email.html", {'user': user, 'reset_link': reset_link})
        text_message = render_to_string("emails/password_reset_email.txt", {'user': user, 'reset_link': reset_link})

        subject = "Reset your password"
        from_email = 'ranebhushan786@gmail.com'
        to_email = [user.email]

        # Send email as HTML
        email_message = EmailMultiAlternatives(subject, text_message, from_email, to_email)
        email_message.attach_alternative(html_message, "text/html")
        email_message.send(fail_silently=False)

        return Response({'detail': 'If an account exists, you will receive a password reset email.'})

class PasswordResetConfirmView(APIView):
    def post(self, request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')

        if not uid or not token or not new_password:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError):
            return Response({'error': 'Invalid UID'}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({'detail': 'Password has been reset successfully'})