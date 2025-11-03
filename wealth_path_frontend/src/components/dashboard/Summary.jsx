import DashboardCard from "./DashboardCard";
import { useState, useEffect } from "react";
import { getTotals } from "../transactionsApi";

const Summary = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    getTotals()
      .then((data) => {
        setTotalIncome(data.total_income);
        setTotalExpense(data.total_expense);
      })
      .catch((err) => console.error(err));
  }, []);

  const savings = totalIncome - totalExpense;
  const expenseRatio = (totalExpense / totalIncome) * 100;
  const percentage = (savings / totalIncome) * 100;

  return (
    <DashboardCard>
      <div className="flex flex-row h-full justify-between items-center px-5 ">
        <div className="flex flex-col flex-1 h-full justify-between ">
          <div className="text-2xl font-bold mb-3"> Summary</div>
          <div className="mb-3"> Total income: ${Number(totalIncome).toLocaleString()}</div>
          <div className="mb-3"> Total expense: ${Number(totalExpense).toLocaleString()}</div>
        </div>
        {/* circular progress */}
        <div className="w-[50%]  flex flex-col justify-end items-center">
          <div
            className="w-[75%] aspect-square rounded-full flex items-center justify-center mb-3"
            style={{
              background: `conic-gradient(#FFA500 ${
                expenseRatio * 3.6
              }deg, #41dc8e 0deg)`,
            }}
          >
            {/* Inner circle to make it look like a ring */}
            <div className="w-[70%] h-[70%] bg-white rounded-full flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-gray-800">Total Savings:</span>
              <span className="text-sm text-gray-500">${savings}</span>
            </div>
          </div>
          <div id="legends" className="flex flex-row">
            <div className="flex flex-row mr-5">
              <div
                className="w-5 aspect-square rounded-2xl mr-1"
                style={{ backgroundColor: "#FFA500" }}
              ></div>
              <div>Expense</div>
            </div>
            <div className="flex flex-row">
              <div
                className="w-5 aspect-square rounded-2xl mr-1"
                style={{ backgroundColor: "#41dc8e" }}
              ></div>
              <div>Savings</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default Summary;
