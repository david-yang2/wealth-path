from django.urls import path
from . import views

urlpatterns = [
    path("", views.TransactionsListAPIView.as_view())
]