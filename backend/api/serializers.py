from rest_framework import serializers
from .models import Branch, Year, BookType, Seller, BookSet, Book,Contact,BookInquiry

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id', 'name', 'image']

class YearSerializer(serializers.ModelSerializer):
    class Meta: model = Year; fields = ['id', 'name']

class BookTypeSerializer(serializers.ModelSerializer):
    class Meta: model = BookType; fields = ['id', 'name']

class SellerSerializer(serializers.ModelSerializer):
    class Meta: model = Seller; fields = ['id', 'name', 'email', 'mobile']

class BookSerializer(serializers.ModelSerializer):
    book_type = serializers.StringRelatedField()  
    class Meta:
        model = Book
        fields = ['id', 'name', 'book_type', 'price', 'image']

class BookSetSerializer(serializers.ModelSerializer):
    seller = SellerSerializer()
    books = BookSerializer(many=True)
    branch = serializers.StringRelatedField()  
    year = serializers.StringRelatedField() 
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = BookSet
        fields = ['id', 'seller', 'branch', 'year', 'image', 'description', 'books', 'total_price', 'created_at']
        read_only_fields = ['created_at']
    def get_total_price(self, obj):
        return obj.total_price

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"


class BookInquirySerializer(serializers.ModelSerializer):
    bookset_id = serializers.PrimaryKeyRelatedField(
        source='bookset', queryset=BookSet.objects.all()
    )

    class Meta:
        model = BookInquiry
        fields = ['id', 'bookset_id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']