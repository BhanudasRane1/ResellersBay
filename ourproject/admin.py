from django.contrib import admin

# Register your models here.
from .models import sell_product,Contact

admin.site.register(sell_product)
admin.site.register(Contact)