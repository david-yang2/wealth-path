from django.urls import path
from . import views

urlpatterns = [
    path("", views.UserTransactionsListAPIView.as_view(), name='transactions-list'),
    path("totals", views.TransactionTotalsAPIView.as_view(), name="totals"),
    path("<uuid:pk>/", views.UpdateTransactionAPIView.as_view(), name="update-transaction"),
    path("monthly-transaction", views.MonthlyTransactionAPIView.as_view(), name="monthly-transaction"),
    path("remove/<uuid:pk>/", views.RemoveTransactionAPIView.as_view(), name="remove-transaction")
]