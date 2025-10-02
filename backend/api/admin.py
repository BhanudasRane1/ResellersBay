from django.contrib import admin
from .models import Seller, BookSet, Book, Branch, Year, BookType, Contact,BookInquiry


# Inline Books inside BookSet
class BookInline(admin.TabularInline):  # or StackedInline if you prefer large form
    model = Book
    extra = 1
    fields = ("name", "book_type", "price", "image")
    show_change_link = True


@admin.register(BookSet)
class BookSetAdmin(admin.ModelAdmin):
    list_display = ("id", "seller", "branch", "year", "description", "created_at")
    list_filter = ("branch", "year", "created_at")
    search_fields = ("seller__name", "seller__email", "description")
    inlines = [BookInline]


@admin.register(Seller)
class SellerAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "mobile")
    search_fields = ("name", "email", "mobile")


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "bookset", "book_type", "price")
    list_filter = ("book_type",)
    search_fields = ("name",)


@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Year)
class YearAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(BookType)
class BookTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "created_at")
    search_fields = ("name", "email", "phone")


@admin.register(BookInquiry)
class BookInquiryAdmin(admin.ModelAdmin):
    list_display = ('id', 'bookset', 'name', 'email', 'created_at')
    search_fields = ('name', 'email', 'bookset__id', 'bookset__seller__name')
    list_filter = ('created_at', 'bookset')
    readonly_fields = ('created_at',)