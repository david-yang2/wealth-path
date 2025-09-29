from django.urls import path
from . import views

urlpatterns = [
    path("", views.UserTransactionsListAPIView.as_view())
]