from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Transaction
from .api.serializers import TransactionSerializer

# Create your views here.

class TransactionsListAPIView(APIView):
    def get(self, request):
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    
