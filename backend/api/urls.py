from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BranchViewSet, YearViewSet, BookTypeViewSet, BookSetViewSet,ContactViewSet,BookInquiryViewSet

router = DefaultRouter()
router.register(r'branches', BranchViewSet, basename='branch')
router.register(r'years', YearViewSet, basename='year')
router.register(r'booktypes', BookTypeViewSet, basename='booktype')
router.register(r'booksets', BookSetViewSet, basename='bookset')
router.register(r'contacts', ContactViewSet, basename='contact')
router.register(r'book-inquiries', BookInquiryViewSet, basename='book-inquiries')

urlpatterns = [
    path('api/', include(router.urls)),
]
