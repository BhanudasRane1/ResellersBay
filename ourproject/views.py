from django.shortcuts import render
# from .models import product
from math import ceil
from django.urls import reverse
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.core.mail import send_mail
from .models import sell_product,Contact
from django.views.generic import CreateView
# Create your views here.
from .forms import sell_product_form

from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings


def inquiry(request):
    if request.method == 'POST':
        message = request.POST['message']
        name=request.POST['name']
        email=request.POST['email']
        phone=request.POST['phone']
       
       
        all_message = 'Inquiry for your books...!! Please contact this person as soon as possible...'+'\n'+'Name:-'+name+'\n'+'phone:-'+phone+'\n'+'email:-'+email+'\n'+'message:-'+message+'\n'
        
        owner_mail = request.POST['owner_mail']
        
        send_mail('Resellers Bay',all_message,settings.EMAIL_HOST_USER,[owner_mail],fail_silently=False)
    return HttpResponseRedirect('/')






def index(request):
    allProds=[]
    catProds = sell_product.objects.values('year','id')
    cats = {item['year'] for item in catProds}
    for cat in cats:
        prod = sell_product.objects.filter(year =cat)
        n = len(prod)
        nSlides = n // 4 + ceil((n / 4) - (n // 4))
        allProds.append([prod,range(1,nSlides),nSlides])
    
    params = {'allProds':allProds}
    return render(request,'home.html',params)

def searchMatch(query, item):
    if query in item.seller_name.lower() or query in item.year.lower() or query in item.branch.lower() or query in item.seller_name.upper() or query in item.year.upper() or query in item.branch.upper() or query in item.seller_name or query in item.year or query in item.branch:
        return True
    else:
        return False

def searchbranch(query, item):
    if query in item.branch:
        return True
    else:
        return False


def search(request):
    query = request.GET.get('search')
    allProds=[]
    catProds = sell_product.objects.values('year','id')
    cats = {item['year'] for item in catProds}
    for cat in cats:
        prodtemp = sell_product.objects.filter(year =cat)
        prod = [item for item in prodtemp if searchMatch(query,item)]
        n = len(prod)
        nSlides = n // 4 + ceil((n / 4) - (n // 4))
        if len(prod)!= 0:
            allProds.append([prod,range(1,nSlides),nSlides])
    
    params = {'allProds':allProds,"msg":""}
    if len(allProds)==0 or len(query)<1:
        params={'msg':"Please make sure to enter relevant search query"}
    return render(request,'search.html',params)


def info_search(request):
    query ='Information Technology'
    allProds=[]
    catProds = sell_product.objects.values('branch','id')
    cats = {item['branch'] for item in catProds}
    for cat in cats:
        prodtemp = sell_product.objects.filter(branch =cat)
        prod = [item for item in prodtemp if searchbranch(query,item)]
        n = len(prod)
        nSlides = n // 4 + ceil((n / 4) - (n // 4))
        if len(prod)!= 0:
            allProds.append([prod,range(1,nSlides),nSlides])
        
    params = {'allProds':allProds,"msg":""}
    if len(allProds)==0 or len(query)<1:
        params={'msg':"Please make sure to enter relevant search query"}
       
    return render(request,'info_search.html',params)

def civil_search(request):
    query ='Civil Engineer'
    allProds=[]
    catProds = sell_product.objects.values('branch','id')
    cats = {item['branch'] for item in catProds}
    for cat in cats:
        prodtemp = sell_product.objects.filter(branch =cat)
        prod = [item for item in prodtemp if searchbranch(query,item)]
        n = len(prod)
        nSlides = n // 4 + ceil((n / 4) - (n // 4))
        if len(prod)!= 0:
            allProds.append([prod,range(1,nSlides),nSlides])
        
    params = {'allProds':allProds,"msg":""}
    if len(allProds)==0 or len(query)<1:
        params={'msg':"Please make sure to enter relevant search query"}
       
    return render(request,'civil_search.html',params)

def etc_search(request):
    query ='E&TC Engineer'
    allProds=[]
    catProds = sell_product.objects.values('branch','id')
    cats = {item['branch'] for item in catProds}
    for cat in cats:
        prodtemp = sell_product.objects.filter(branch =cat)
        prod = [item for item in prodtemp if searchbranch(query,item)]
        n = len(prod)
        nSlides = n // 4 + ceil((n / 4) - (n // 4))
        if len(prod)!= 0:
            allProds.append([prod,range(1,nSlides),nSlides])
        
    params = {'allProds':allProds,"msg":""}
    if len(allProds)==0 or len(query)<1:
        params={'msg':"Please make sure to enter relevant search query"}
       
    return render(request,'etc_search.html',params)
def mech_search(request):
    query ='Mechanical Engineer'
    allProds=[]
    catProds = sell_product.objects.values('branch','id')
    cats = {item['branch'] for item in catProds}
    for cat in cats:
        prodtemp = sell_product.objects.filter(branch =cat)
        prod = [item for item in prodtemp if searchbranch(query,item)]
        n = len(prod)
        nSlides = n // 4 + ceil((n / 4) - (n // 4))
        if len(prod)!= 0:
            allProds.append([prod,range(1,nSlides),nSlides])
        
    params = {'allProds':allProds,"msg":""}
    if len(allProds)==0 or len(query)<1:
        params={'msg':"Please make sure to enter relevant search query"}
       
    return render(request,'mech_search.html',params)
def comp_search(request):
    query ='Computer Engineer'
    allProds=[]
    catProds = sell_product.objects.values('branch','id')
    cats = {item['branch'] for item in catProds}
    for cat in cats:
        prodtemp = sell_product.objects.filter(branch =cat)
        prod = [item for item in prodtemp if searchbranch(query,item)]
        n = len(prod)
        nSlides = n // 4 + ceil((n / 4) - (n // 4))
        if len(prod)!= 0:
            allProds.append([prod,range(1,nSlides),nSlides])
        
    params = {'allProds':allProds,"msg":""}
    if len(allProds)==0 or len(query)<1:
        params={'msg':"Please make sure to enter relevant search query"}
       
    return render(request,'comp_search.html',params)














class sell(CreateView):
    model = sell_product
    form_class=sell_product_form
    template_name = "sell.html"
    # fields = '__all__'
    def get_success_url(self):
        return reverse('index')


  



def aboutus(request):
    return render(request,'about.html')

def contactus(request):
    return render(request,'contactus.html')


    
def quickview(request,myid):
    product = sell_product.objects.filter(id=myid)
    return render(request,'quick.html',{'product':product[0]})




def contact(request):
    thank=False
    if request.method=="POST":
        name=request.POST.get('name', '')
        email=request.POST.get('email', '')
        phone=request.POST.get('phone', '')
        desc=request.POST.get('desc', '')
       
        contact = Contact(name=name, email=email, phone=phone, desc=desc)
        contact.save()
        thank=True
    return render(request, "contactus.html" ,{'thank':thank})








# def sell(request):
#     if request.method=="POST":
#         name=request.POST.get('name', '')
#         branch=request.POST.get('branch', '')
#         year=request.POST.get('year', '')
#         price=request.POST.get('price', '')
#         image = request.POST.get('image','')

#         sellings = sell_product(name=name, branch=branch, year=year, price=price,image=image)
#         sellings.save()
#     return render(request, "contact.html")
    




# def index(request):
#     # products = product.objects.all()
#     # print(products)

#     allProds=[]
#     catProds = product.objects.values('category','id')
#     cats = {item['category'] for item in catProds}
#     for cat in cats:
#         prod = product.objects.filter(category =cat)
#         n = len(prod)
#         nSlides = n // 4 + ceil((n / 4) - (n // 4))
#         allProds.append([prod,range(1,nSlides),nSlides])
#     # params = {'no_of_slides':nSlides,'range':range(1,nSlides),'product':products}
#     # allProds = [[products,range(1,nSlides),nSlides],
#     #             [products,range(1,nSlides),nSlides]]
#     params = {'allProds':allProds}
#     return render(request,'home.html',params)
