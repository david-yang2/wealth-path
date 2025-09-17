from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class Transaction(models.Model):
    class TransactionType(models.TextChoices):
        INCOME = "INCOME", "Income"
        EXPENSE = "EXPENSE", "Expense"


    class Category(models.TextChoices):
        # Expense categories
        FOOD = "FOOD", "Food"
        RENT = "RENT", "Rent"
        TRANSPORTATION = "TRANSPORTATION", "Transportation"
        ENTERTAINMENT = "ENTERTAINMENT", "Entertainment"
        UTILITIES = "UTILITIES", "Utilities"
        HEALTH = "HEALTH", "Health"
        OTHER = "OTHER", "Other"

        # Income categories
        PAYCHECK = "PAYCHECK", "Paycheck"
        RSUS = "RSUS", "RSUs"
        BONUS = "BONUS", "Bonus"
        CAPITAL_GAINS = "CAPITAL_GAIN", "Capital Gain"
        DIVIDEND = "DIVIDEND", "Dividend"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="transactions")

    type = models.CharField(max_length=10, choices=TransactionType.choices)

    category = models.CharField(max_length = 20, choices = Category.choices)

    amount = models.DecimalField(max_digits=12, decimal_places=2)

    currency = models.CharField(max_length = 3, default = "USD")

    description = models.TextField(blank=True, null=True)

    transaction_date = models.DateField()  # lets user pick when it actually happened

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        sign = "+" if self.type == self.TransactionType.INCOME else "-"
        return f"{self.user} - {self.category} - {sign}{self.amount} {self.currency}"