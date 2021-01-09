from django.db import models
from django.urls import reverse
from .modelchoices import branch_choices,year_choices,type_choices


class sell_product(models.Model):
    seller_name = models.CharField(max_length=50,default="")
    branch = models.CharField(max_length=50,choices=branch_choices,default="")
    year = models.CharField(max_length=50 ,choices=year_choices,default="")
    email = models.EmailField(max_length=254,default="")
    bookset_image = models.ImageField(null=True,blank=True,upload_to="sell/Uploaded_Images")
    
    book_name_a = models.CharField(max_length=50,default="",blank=True)
    book_type_a = models.CharField(max_length=50 ,choices=type_choices,default="",blank=True)
    price_a = models.IntegerField(default=0,blank=True)
    image_a = models.ImageField(null=True,blank=True,upload_to="sell/Uploaded_Images")
    
    book_name_b = models.CharField(max_length=50,default="",blank=True)
    book_type_b = models.CharField(max_length=50 ,choices=type_choices,default="",blank=True)
    price_b = models.IntegerField(default=0,blank=True)
    image_b = models.ImageField(null=True,blank=True,upload_to="sell/Uploaded_Images")
    
    book_name_c = models.CharField(max_length=50,default="",blank=True)
    book_type_c = models.CharField(max_length=50 ,choices=type_choices,default="",blank=True)
    price_c = models.IntegerField(default=0,blank=True)
    image_c = models.ImageField(null=True,blank=True,upload_to="sell/Uploaded_Images")
    
    book_name_d = models.CharField(max_length=50,default="",blank=True)
    book_type_d = models.CharField(max_length=50 ,choices=type_choices,default="",blank=True)
    price_d = models.IntegerField(default=0,blank=True) 
    image_d = models.ImageField(null=True,blank=True,upload_to="sell/Uploaded_Images")
    
    book_name_e = models.CharField(max_length=50,default="",blank=True)
    book_type_e = models.CharField(max_length=50 ,choices=type_choices,default="",blank=True)
    price_e = models.IntegerField(default=0,blank=True)
    image_e = models.ImageField(null=True,blank=True,upload_to="sell/Uploaded_Images")
   
    book_name_f = models.CharField(max_length=50,default="",blank=True)
    book_type_f = models.CharField(max_length=50 ,choices=type_choices,default="",blank=True)
    price_f = models.IntegerField(default=0,blank=True)
    image_f = models.ImageField(null=True,blank=True,upload_to="sell/Uploaded_Images")
   
    description = models.CharField(max_length=50,default="")
     
     
    

    def __str__(self):
        return self.seller_name;
    
    @staticmethod
    def get_all_products_by_id(branch_id):
        if branch_id:

            return sell_product.objects.filter(branch=branch_id)
        else:
            return sell_product.get_all_products();  



class Contact(models.Model):
    msg_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=70, default="")
    phone = models.CharField(max_length=70, default="")
    desc = models.CharField(max_length=500, default="")