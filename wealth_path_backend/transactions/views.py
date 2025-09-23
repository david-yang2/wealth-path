from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Transaction
from .api.serializers import TransactionSerializer
from rest_framework import generics


# Create your views here.

class TransactionsListAPIView(APIView):
    def get(self, request):
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    
class UserTransactionsListAPIView(generics.ListAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    # permission check
    # view only accessible to authenticated users, 401 if not
    permission_classes = [IsAuthenticated]

    # override queryset to filter for logged in user
    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(user=self.request.user)
