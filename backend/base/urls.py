# in charge of connecting views to URls

from django.urls import path
from . import views

# JSON Web Token
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name="products"),
    path('users/profile/', views.getUserProfile, name="users"),
    path('products/<str:pk>', views.getProduct, name="product"),
]
