import { useState } from "react";
import { postTransaction } from "./transactionsApi";

// payload = {
// type,    select
// category,    select
// amount,   text
// currency, number
// description text
// }

const AddTransactionModal = (props) => {
  const {setToggleAddTransactionModal} = props
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const categoryOptions = (type) => {
    const optionsData = {
      INCOME: ["PAYCHECK", "RSUS", "BONUS", "CAPITAL_GAINS", "DIVIDEND"],
      EXPENSE: [
        "FOOD",
        "RENT",
        "TRANSPORTATION",
        "ENTERTAINMENT",
        "UTILITIES",
        "HEALTH",
        "OTHER",
      ],
    };

    return optionsData[type];
  };
  const todaysDate = `${year}-${month}-${day}`;
  const [type, setType] = useState("INCOME");
  const [category, setCategory] = useState(()=>categoryOptions(type)[0]);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState(todaysDate);

  const addTransaction = async (e) => {
    e.preventDefault();

    const amountNum = Number(amount)

    const payload = {
      type,
      category,
      amount: amountNum,
      currency,
      description,
      transaction_date: transactionDate,
    };

    console.log(payload)

    try {

        await postTransaction(payload);
    } catch (err) {
        console.error(err)
    }
  };


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center" onClick={() => setToggleAddTransactionModal(prev => !prev)}>
      <div onClick={(e) => e.stopPropagation()}>
        <form onSubmit={(e) => addTransaction(e)}>
          <label htmlFor="transaction-date">Transaction Date</label>
          <input
            id="transaction-date"
            value={transactionDate}
            type="date"
            max={todaysDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />

          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions(type).map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>

          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            min="0"
            id="amount"
            onChange={(e) => setAmount(e.target.value)}
          />

          <label htmlFor="currency">Currency</label>
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
