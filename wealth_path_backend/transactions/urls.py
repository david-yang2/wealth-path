from django.urls import path
from . import views

urlpatterns = [
    path("", views.UserTransactionsListAPIView.as_view(), name='transactions-list'),
    path("totals", views.TransactionTotalsAPIView.as_view(), name="totals")
]