
from django import forms
from .models import sell_product

class sell_product_form(forms.ModelForm):
    class Meta:

        model = sell_product
        fields = ('seller_name','email','branch','year','bookset_image','book_name_a','book_type_a','price_a','image_a','book_name_b','book_type_b','price_b','image_b','book_name_c','book_type_c','price_c','image_c','book_name_d','book_type_d','price_d','image_d','book_name_e','book_type_e','price_e','image_e','book_name_f','book_type_f','price_f','image_f','description')
        

        widgets = {
                'seller_name':forms.TextInput(attrs={'class':'form-control'}),
                'branch':forms.Select(attrs={'class':'form-control'}),
                'year':forms.Select(attrs={'class':'form-control'}),
                'email':forms.TextInput(attrs={'class':'form-control'}),

                'book_name_a':forms.TextInput(attrs={'class':'form-control'}),
                'book_type_a':forms.Select(attrs={'class':'form-control'}),
                'price_a':forms.TextInput(attrs={'class':'form-control'}),
                
                'book_name_b':forms.TextInput(attrs={'class':'form-control'}),
                'book_type_b':forms.Select(attrs={'class':'form-control'}),
                'price_b':forms.TextInput(attrs={'class':'form-control'}),
                
                'book_name_c':forms.TextInput(attrs={'class':'form-control'}),
                'book_type_c':forms.Select(attrs={'class':'form-control'}),
                'price_c':forms.TextInput(attrs={'class':'form-control'}),
                
                'book_name_d':forms.TextInput(attrs={'class':'form-control'}),
                'book_type_d':forms.Select(attrs={'class':'form-control'}),
                'price_d':forms.TextInput(attrs={'class':'form-control'}),
                
                'book_name_e':forms.TextInput(attrs={'class':'form-control'}),
                'book_type_e':forms.Select(attrs={'class':'form-control'}),
                'price_e':forms.TextInput(attrs={'class':'form-control'}),
                
                'book_name_f':forms.TextInput(attrs={'class':'form-control'}),
                'book_type_f':forms.Select(attrs={'class':'form-control'}),
                'price_f':forms.TextInput(attrs={'class':'form-control'}),
                
                'description':forms.TextInput(attrs={'class':'form-control'}),

                # 'image':form.TextInput(attrs={'class':'form-control'})

        }