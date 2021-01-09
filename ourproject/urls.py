from django.contrib import admin
from django.urls import path
from . import views
from .views import sell,index
from django.contrib.auth import views as auth_views 
urlpatterns = [
    path('',views.index,name="index"),
    path('search/',views.search,name="search"),
    path('info_search/',views.info_search,name="info_search"),
    path('civil_search/',views.civil_search,name="civil_search"),
    path('etc_search/',views.etc_search,name="etc_search"),
    path('mech_search/',views.mech_search,name="mech_search"),
    path('comp_search/',views.comp_search,name="comp_search"),
    path('aboutus/',views.aboutus,name="aboutus"),
    path('contactus/', views.contact,name="contact"),
    path('inquiry/',views.inquiry,name="inquiry"),

    path('quickview/<int:myid>',views.quickview,name="quickview"),
    # path('article/<int:pk>',ArticleDetailView.as_view(),name='article_detail'),
    path('sell/',sell.as_view(),name="sell"),
    



    path('reset_password/',
    auth_views.PasswordResetView.as_view(template_name="password_forgot.html"),
    name="password_reset" ),

    # path('reset_password/',
    # auth_views.PasswordResetView.as_view(),
    # name="password_reset" ),
    
    path('reset_password_sent/',
    auth_views.PasswordResetDoneView.as_view(template_name="password_reset_sent.html"),
    name='password_reset_done'),
    
    # path('reset_password_sent/',
    # auth_views.PasswordResetDoneView.as_view(),
    # name='password_reset_done'),

    path('reset/<uidb64>/<token>/',
    auth_views.PasswordResetConfirmView.as_view(template_name="password_reset_form.html"),
    name='password_reset_confirm'),

    # path('reset/<uidb64>/<token>/',
    # auth_views.PasswordResetConfirmView.as_view(),
    # name='password_reset_confirm'),
    
    path('reset_password_complete/',
    auth_views.PasswordResetCompleteView.as_view(template_name="password_reset_confirm.html"),
    name='password_reset_complete'),
    # path('reset_password_complete/',
    # auth_views.PasswordResetCompleteView.as_view(),
    # name='password_reset_complete'),
]