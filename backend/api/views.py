from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import transaction
from .models import Branch, Year, BookType, BookSet, Book, Seller,Contact
from .serializers import BranchSerializer, YearSerializer, BookTypeSerializer, BookSetSerializer,ContactSerializer
import re
import json


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