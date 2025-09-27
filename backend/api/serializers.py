from rest_framework import serializers
from .models import Branch, Year, BookType, Seller, BookSet, Book,Contact

class BranchSerializer(serializers.ModelSerializer):
    class Meta: model = Branch; fields = ['id', 'name']

class YearSerializer(serializers.ModelSerializer):
    class Meta: model = Year; fields = ['id', 'name']

class BookTypeSerializer(serializers.ModelSerializer):
    class Meta: model = BookType; fields = ['id', 'name']

class SellerSerializer(serializers.ModelSerializer):
    class Meta: model = Seller; fields = ['id', 'name', 'email', 'mobile']

class BookSerializer(serializers.ModelSerializer):
    # accept book_type as id
    class Meta:
        model = Book
        fields = ['id', 'name', 'book_type', 'price', 'image']

class BookSetSerializer(serializers.ModelSerializer):
    seller = SellerSerializer()
    books = BookSerializer(many=True)
    branch = serializers.PrimaryKeyRelatedField(queryset=Branch.objects.all())
    year = serializers.PrimaryKeyRelatedField(queryset=Year.objects.all())

    class Meta:
        model = BookSet
        fields = ['id', 'seller', 'branch', 'year', 'image', 'description', 'books', 'created_at']
        read_only_fields = ['created_at']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"