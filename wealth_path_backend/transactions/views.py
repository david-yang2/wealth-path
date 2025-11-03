from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Transaction
from .api.serializers import TransactionSerializer
from rest_framework import generics
from decimal import Decimal
from datetime import datetime
from django.db.models import Sum,Q


# Create your views here.

class TransactionsListAPIView(APIView):
    def get(self, request):
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

# create UserTransactionsListAPIView    
class UserTransactionsListAPIView(generics.ListAPIView):

    # base queryset of all transaciton objects
    queryset = Transaction.objects.all()
    # Serializer used to format transaction data for the frontend
    serializer_class = TransactionSerializer
    # Allow ordering by the transaction_date field only
    ordering_fields = ["transaction_date"]

    # permission check
    # Restrict access to authenticated users (returns 401 if not authenticated)
    permission_classes = [IsAuthenticated]

    # Customize queryset to return only the logged-in user's transactions
    def get_queryset(self):
        qs = super().get_queryset()
        # Filter transactions by the current user and sort by date (newest first)
        return qs.filter(user=self.request.user).order_by("-transaction_date")




class TransactionTotalsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Optional filters
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        qs = Transaction.objects.filter(user=user)
        if start_date:
            try:
                sd = datetime.strptime(start_date, "%Y-%m-%d").date()
                qs = qs.filter(transaction_date__gte=sd)
            except ValueError:
                return Response({"detail": "start_date must be YYYY-MM-DD"}, status=400)
        if end_date:
            try:
                ed = datetime.strptime(end_date, "%Y-%m-%d").date()
                qs = qs.filter(transaction_date__lte=ed)
            except ValueError:
                return Response({"detail": "end_date must be YYYY-MM-DD"}, status=400)

        agg = qs.aggregate(
            total_income=Sum("amount", filter=Q(type=Transaction.TransactionType.INCOME)),
            total_expense=Sum("amount", filter=Q(type=Transaction.TransactionType.EXPENSE)),
        )

        total_income = agg.get("total_income") or Decimal("0.00")
        total_expense = agg.get("total_expense") or Decimal("0.00")

        # Serialize both totals and transaction list
        transactions = TransactionSerializer(qs, many=True)

        data = {
            "total_income": total_income,
            "total_expense": total_expense,
            "transactions": transactions.data,
        }

        return Response(data)