from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BranchViewSet, YearViewSet, BookTypeViewSet,
    BookSetViewSet, ContactViewSet, BookInquiryViewSet,
    RegisterView, PasswordResetView,PasswordResetConfirmView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import views as auth_views

router = DefaultRouter()
router.register(r'branches', BranchViewSet, basename='branch')
router.register(r'years', YearViewSet, basename='year')
router.register(r'booktypes', BookTypeViewSet, basename='booktype')
router.register(r'booksets', BookSetViewSet, basename='bookset')
router.register(r'contacts', ContactViewSet, basename='contact')
router.register(r'book-inquiries', BookInquiryViewSet, basename='book-inquiries')

urlpatterns = [
    path('api/', include(router.urls)),

    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('api/password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    

]
