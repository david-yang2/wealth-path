from rest_framework import serializers
from transactions.models import Transaction 

class TransactionSerializer(serializers.ModelSerializer):

    class Meta:

        model = Transaction
        fields = ["id", "user", "type", "category", "amount", "currency", "description", "transaction_date", "created_at", "updated_at"]

        read_only_fields = [
            "id",
            "user",
            "created_at",
            "updated_at",
        ]