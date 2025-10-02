from django.db import models
from django.contrib.auth.models import User

class Branch(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='branch_images/', null=True, blank=True)

    def __str__(self):
        return self.name

class Year(models.Model):
    name = models.CharField(max_length=20)
    def __str__(self): return self.name

class BookType(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self): return self.name

class Seller(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=20)
    def __str__(self): return self.name

class BookSet(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='booksets')
    branch = models.ForeignKey(Branch, on_delete=models.PROTECT)
    year = models.ForeignKey(Year, on_delete=models.PROTECT)
    image = models.ImageField(upload_to='bookset_images/', null=True, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return f"{self.seller.name} - {self.branch.name} ({self.year.name})"
    @property
    def total_price(self):
        return sum(book.price for book in self.books.all())

class Book(models.Model):
    bookset = models.ForeignKey(BookSet, on_delete=models.CASCADE, related_name='books')
    name = models.CharField(max_length=200)
    book_type = models.ForeignKey(BookType, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='book_images/', null=True, blank=True)
    def __str__(self): return self.name


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.DecimalField(max_digits=10, decimal_places=0)
    message = models.TextField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): 
        return f"{self.name} - {self.email}"
    


class BookInquiry(models.Model):
    bookset = models.ForeignKey(
        'BookSet', on_delete=models.CASCADE, related_name='inquiries'
    )
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)  # add this
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry for {self.bookset} by {self.name}"