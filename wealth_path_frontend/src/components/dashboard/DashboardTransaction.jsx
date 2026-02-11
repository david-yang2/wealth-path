import DashboardCard from "./DashboardCard";
import { generateDateRange } from "./generateDateRange";
import { getMonthlyTransaction } from "../transactions/transactionsApi";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"


const DashboardTransaction = () => {
  // monthly transactions
  const [monthlyTransactions, setMonthlyTransactions] = useState([]);

  const navigate = useNavigate()

  // generate data range
  // extract current months start and end date
  const dateRanges = generateDateRange();
  const startDate = dateRanges[0].start_date;
  const endDate = dateRanges[0].end_date;
  


  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = (date.getMonth()+1).toString().padStart(2,"0");
  const currentDate = (date.getDate()).toString().padStart(2,"0");
  const today = currentYear + "-" + currentMonth + "-" + currentDate

  const monthString = date.toLocaleDateString('default', {month:"long"})
  
  useEffect(() => {
    getMonthlyTransaction(startDate, today).then((data) =>
      setMonthlyTransactions(data),
    );
  }, []);

  return (
    <DashboardCard>
      <div id="dashboard-transaction">
        <div className="flex justify-between items-center mb-3">
          <div className="text-xl underline">
            {" "}
            Transactions for {monthString} {currentYear}{" "}
          </div>
          <button
            className=""
            onClick={() => navigate("/transactions")}
          >
            View All Transactions
          </button>
        </div>
        {/* table */}
        <div className="text-l">
          <table className="table-auto w-full text-left border-collapse bg-slate-100">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm md:text-lg underline">
              <tr>
                <th>Transaction Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {monthlyTransactions.map((transaction) => (
                <tr key={transaction.id} className="text-sm">
                  <td>{transaction.transaction_date}</td>
                  <td>{transaction.category.toLowerCase()}</td>
                  <td>{transaction.type.toLowerCase()}</td>
                  <td>{transaction.amount}</td>
                  <td> {transaction.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardCard>
  );
};

export default DashboardTransaction;
