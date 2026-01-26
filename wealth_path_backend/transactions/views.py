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
    # Restrict access to authenticated users only (returns 401 if not authenticated)
    permission_classes = [IsAuthenticated]

    # Customize queryset to return only the logged-in user's transactions
    def get_queryset(self):
        qs = super().get_queryset()
        # Filter transactions by the current user and sort by date (newest first)
        return qs.filter(user=self.request.user).order_by("-transaction_date")




class TransactionTotalsAPIView(APIView):
    # restrict access to authenticated users only
    permission_classes = [IsAuthenticated]

    # get request
    def get(self, request):

        # get the request's user
        user = request.user

        # Optional filters
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")


        # filter queryset by user. only retrieve transaction objects that belongs to the user
        qs = Transaction.objects.filter(user=user)

        # if user submitted start_date and end_dates
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
            # Sum the 'amount' of all transactions where 'type' is INCOME
            total_income=Sum("amount", filter=Q(type=Transaction.TransactionType.INCOME)),
            # Sum the 'amount' of all transactions where 'type' is EXPENSE
            total_expense=Sum("amount", filter=Q(type=Transaction.TransactionType.EXPENSE)),
            # Sum the 'amount' of transactions in each specific category
            total_food=Sum("amount", filter=Q(category=Transaction.Category.FOOD)),
            total_rent=Sum("amount", filter=Q(category=Transaction.Category.RENT)),
            total_transportation=Sum("amount", filter=Q(category=Transaction.Category.TRANSPORTATION)),
            total_entertainment=Sum("amount", filter=Q(category=Transaction.Category.ENTERTAINMENT)),
            total_utilities=Sum("amount", filter=Q(category=Transaction.Category.UTILITIES)),
            total_health=Sum("amount", filter=Q(category=Transaction.Category.HEALTH)),
            total_other=Sum("amount", filter=Q(category=Transaction.Category.OTHER))
            
        )

        total_income = agg.get("total_income") or Decimal("0.00")
        total_expense = agg.get("total_expense") or Decimal("0.00")
        total_food = agg.get("total_food") or Decimal("0.00")
        total_rent = agg.get("total_rent") or Decimal("0.00")
        total_transportation = agg.get("total_transportation") or Decimal("0.00")
        total_entertainment = agg.get("total_entertainment") or Decimal("0.00")
        total_utilities = agg.get("total_utilities") or Decimal("0.00")
        total_health = agg.get("total_health") or Decimal("0.00")
        total_other= agg.get("total_other") or Decimal("0.00")

        # Serialize both totals and transaction list
        transactions = TransactionSerializer(qs, many=True)

        data = {
            "total_income": total_income,
            "total_expense": total_expense,
            "total_food": total_food,
            "total_rent": total_rent,
            "total_transportation" : total_transportation,
            "total_entertainment" : total_entertainment,
            "total_utilities" : total_utilities,
            "total_health" : total_health,
            "total_other" : total_other,
            "transactions": transactions.data
        }

        return Response(data)
    


# view to update 1 or more properties of the transaction
class UpdateTransactionAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        # Only expose transactions that belong to the authenticated user
        return Transaction.objects.filter(user=self.request.user)