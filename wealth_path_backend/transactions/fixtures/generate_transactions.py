import random
import json
#   {
#     "model": "transactions.transaction",
#     "fields": {
#       "user": 2,
#       "type": "INCOME",
#       "category": "PAYCHECK",
#       "amount": "2900.00",
#       "currency": "USD",
#     : "Bi-weekly paycheck",
#       "transaction_date": "2025-01-03"
#     }
#   },

transaction_type = ["INCOME", "EXPENSE"]

category_info = {
    "FOOD": [ "Grocery Store Run",
                "Lunch",
                "Takeout dinner",
                "Weekly Groceries",
                "Fast food meal",
                "Coffee and pastry",
                "Farmers Market produce",
                "Late-night snack",
                "Restaurant dinner",
                "Bakery Purchase"],
    "RENT": "Monthly Rent",
    "TRANSPORTATION": ["UBER/LYFT", "gas"],
    "ENTERTAINMENT": ["Movies", "Sports Game", "Comedy Show", "Concert", "Arcade"],
    "UTILITIES": "monthly utilities",
    "HEALTH": "monthly premium",
    "OTHER": "-",
    "PAYCHECK" : "Bi-weekly paycheck", 
    # {"RSUS": "RSUs vested"},
    # {"BONUS": "year-end bonus"},
    # {"CAPITAL_GAINS": "sales proceeds from trades"},
    "DIVIDEND": "monthly dividends"
    }


transaction_fields = ["user", "type", "category", "amount", "currency", "description", "transaction_date"]

# generate random transactions

def generate_transaction(category):

    # if it's income, random choice from category income

    if category == "PAYCHECK":
        amount = 2900.00
        description = category_info.get(category)
        txn_type = "INCOME"
    elif category == "DIVIDEND":
        amount = 45.00
        description = category_info.get(category)
        txn_type = "INCOME"
    elif category == "RENT":
        amount = 1300.00
        description = category_info.get(category)
        txn_type="EXPENSE"
    elif category == "UTILITIES":
        amount = round(random.uniform(150,250),2)
        description = category_info.get(category)
        txn_type = "EXPENSE"
    elif category == "HEALTH":
        amount = round(random.uniform(100,120),2)
        description = category_info.get(category)
        txn_type = "EXPENSE"
    elif category == "FOOD":
        amount = round(random.uniform(8,30),2)
        description = random.choice(category_info.get(category))
        txn_type = "EXPENSE"
    elif category == "TRANSPORTATION":
        amount = round(random.uniform(20,35),2)
        description = random.choice(category_info.get(category))
        txn_type = "EXPENSE"
    elif category == "ENTERTAINMENT":
        amount = round(random.uniform(30,60),2)
        description = random.choice(category_info.get(category))
        txn_type = "EXPENSE"


    return {
        "model": "transactions.transaction",
        "fields":{
            "user" :2,
            "type" : txn_type,
            "category" : category,
            "amount": f"{amount:.2f}",
            "currency": "USD",
            "description" : description,
            "transaction_date": "2026-02-03",
            "created_at": "2025-02-03T12:00:00Z",
            "updated_at": "2025-02-03T12:00:00Z"
        }
    }


def monthly_transaction_generator():
    # generate 
    # 2 PAYCHECK
    # 1 DIVIDEND
    # 1 RENT
    # 1 UTILITIES
    # 1 HEALTH
    # 5-10 FOOD
    # 3-6 TRANSPORTATION
    # 4-8 ENTERTAINMENT

    # final list of transaction object
    transactions_list = []

    transactions = ["PAYCHECK", "PAYCHECK", "DIVIDEND", "RENT", "UTILITIES", "HEALTH"]

    food_entries = ["FOOD"] * int(random.uniform(5,11))
    transportation_entries = ["TRANSPORTATION"] * int(random.uniform(3,6))
    entertainment_entries = ["ENTERTAINMENT"] * int(random.uniform(4,9))

    list_to_generate = transactions + food_entries + transportation_entries + entertainment_entries

    
    for entry in list_to_generate:
        transactions_list.append(generate_transaction(entry))
    
    return transactions_list


    

def write_transactions_to_file(transactions, filename="generated_transactions.json"):
    with open(filename, "w") as f:
        json.dump(transactions, f, indent=2)




if __name__ == "__main__":
    transactions = monthly_transaction_generator()
    write_transactions_to_file(transactions)
