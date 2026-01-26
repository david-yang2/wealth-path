import { updateTransactionEntry } from "./transactionsApi";
import { useState } from "react";

const TransactionModal = (props) => {
  const { setOpenEditModal, transactionEntry, setUpdatedEntryToggle } = props;

  // state
  const [transactionDate, setTransactionDate] = useState(
    transactionEntry.transaction_date,
  );
  const [category, setCategory] = useState(transactionEntry.category);
  const [type, setType] = useState(transactionEntry.type);
  const [amount, setAmount] = useState(transactionEntry.amount);
  const [description, setDescription] = useState(transactionEntry.description);

  const updateEntry = async (e) => {
    e.preventDefault();

    const payload = {
      type,
      category,
      amount,
      description,
    };

    try {
      await updateTransactionEntry(transactionEntry.id, payload);
      setUpdatedEntryToggle(prev => !prev)
      setOpenEditModal(false);
    } catch (err) {
      console.error("Failed to update transaction", err);
    }
  };

  // display categories based on transaction type

  const categoryOptions = (type) => {
    const optionsData = {
      INCOME: ["PAYCHECK", "RSUS", "BONUS", "CAPITAL_GAINS", "DIVIDEND"],
      EXPENSE: ["FOOD", "RENT", "TRANSPORTATION", "ENTERTAINMENT", "UTILITIES", "HEALTH", "OTHER"]
    }

    return optionsData[type]

  }

  console.log(categoryOptions[type])

  return (
    <div
      id="transaction-backdrop"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/40 backdrop-blur-sm"
      onClick={() => setOpenEditModal(false)}
    >
      <div
        className=" h-1/2 flex flex-col items-center justify-center bg-slate-200 rounded-lg shadow-lg px-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-bold text-xl">
          Would you like to edit or delete this transaction?
        </div>
        {/* update form */}
        <form
          id="edit-transaction-form"
          onSubmit={(e) => {
            updateEntry(e);
          }}
          className="flex flex-col p-5 "
        >
          <div>
            <label htmlFor="transaction-date">Transaction date:</label>
            <input
              id="transaction-date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
            />
          </div>


          <div>
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >

              <option value="INCOME">INCOME</option>
              <option value="EXPENSE">EXPENSE</option>
            </select>
          </div>

          <div>
            <label htmlFor="category">Category:</label>
            <select id="category" 
            name="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            >
            {categoryOptions(type).map(option => (
              <option value={option}>{option}</option>
            ))}
            </select>
          </div>


          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              type="text"
              className="mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            className="bg-green-400 px-3 py-1 rounded-md font-bold text-lg"
            type="submit"
          >
            {" "}
            Save{" "}
          </button>
        </form>
      </div>
    </div>
  );
};
export default TransactionModal;
