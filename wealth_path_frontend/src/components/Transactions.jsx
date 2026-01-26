import { useState } from "react";
import { getTransactions } from "./transactionsApi";
import { useEffect } from "react";
import useWindowWidth from "./useWindowWidth";
import TransactionModal from "./TransactionModal";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState({});
  const [updatedEntryToggle, setUpdatedEntryToggle] = useState(true)

  useEffect(() => {
    getTransactions()
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => console.error(err));

    // update the transactions if an entry has been updated
  }, [updatedEntryToggle]);

  const width = useWindowWidth();
  const showTable = width >= 768;
  console.log("rendered")
  const updateEntry = (e, entry) => {
    e.stopPropagation();
    setEditTransaction((prev) => ({ ...prev, ...entry}));
    setOpenEditModal(true);
  };

  return (
    <div className="p-8 w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-row items-center mb-5 w-full justify-between">
        <h1 className="text-xl font-bold text-gray-800 mr-5 align-center">
          Here are your transactions:
        </h1>
        <div>Sort By Dates:</div>
      </div>

      {/* start transactions body */}
      {/* show table container for medium+ screen size */}

      {openEditModal ? (
        <TransactionModal
          transactionEntry={editTransaction}
          setOpenEditModal={setOpenEditModal}
          setUpdatedEntryToggle={setUpdatedEntryToggle}
        />
      ) : null}
      {showTable ? (
        <div className="w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
          {/* table container */}
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 border-b">Transaction Date</th>
                <th className="px-4 py-3 border-b">Category</th>
                <th className="px-4 py-3 border-b">Type</th>
                <th className="px-4 py-3 border-b">Amount</th>
                <th className="px-4 py-3 border-b">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 transition-colors"
                    onClick={(e) => updateEntry(e, transaction)}
                  >
                    <td className="px-4 py-3 border-b">
                      {transaction.transaction_date}
                    </td>
                    <td className="px-4 py-3 border-b">{transaction.type}</td>
                    <td className="px-4 py-3 border-b">
                      {transaction.category}
                    </td>
                    <td className="px-4 py-3 border-b">
                      ${transaction.amount}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {transaction.description || "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // show div for screens smaller than medium
        <div className="grid">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-row bg-slate-100 hover:bg-white shadow-md mb-3 rounded-lg p-3 justify-between"
                onClick={(e) => updateEntry(e, transaction)}
              >
                <div>
                  <div> {transaction.transaction_date} </div>
                  <div className="font-bold text-xl">
                    {" "}
                    {transaction.category}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl text-center">
                    ${Number(transaction.amount).toLocaleString("en-US")}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div> No transaction found. </div>
          )}
        </div>
      )}
      {/* end transactions body */}
    </div>
  );
};

export default Transactions;
