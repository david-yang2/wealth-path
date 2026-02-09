import DashboardCard from "./DashboardCard";
import { useState, useEffect } from "react";
import { getTotals } from "../transactionsApi";

const Summary = (props) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balanceStartDate, setBalanceStartDate] = useState();
  const [selectedReturn, setSelectedReturn] = useState("Monthly");

  const { currentDateStr, year, month } = props;

  useEffect(() => {
    getTotals(balanceStartDate, currentDateStr)
      .then((data) => {
        setTotalIncome(data.total_income);
        setTotalExpense(data.total_expense);
      })
      .catch((err) => console.error(err));
  }, [currentDateStr, balanceStartDate]);

  const savings = (totalIncome - totalExpense).toFixed(2);
  const expenseRatio = ((totalExpense / totalIncome) * 100).toFixed(2);
  const percentage = ((savings / totalIncome) * 100).toFixed(2);

  // style for selected time frame
  const timeFrameStyle = "bg-slate-300 px-2 py-2 rounded-md";
  return (
    <DashboardCard>
      <div className="flex flex-col h-full justify-start px-5 ">
        {/* account info */}
        <div className="flex justify-start mb-10">
          <div className="text-xl mb-3 mr-10 underline"> Account Balance: </div>
          <div className="text-xl font-bold ">
            ${Number(savings).toLocaleString()}
          </div>
        </div>

        {/* content container */}
        <div className="w-full flex flex-row justify-between">
          {/* graph - circular progress */}
          <div
            className="w-[50%] aspect-square rounded-full flex items-center justify-center mb-3"
            style={{
              background: `conic-gradient(#FFA500 ${
                expenseRatio * 3.6
              }deg, #41dc8e 0deg)`,
            }}
          >
            {/* Inner circle to make it look like a ring */}
            <div className="w-[70%] h-[70%] aspec-square bg-gray-50 rounded-full flex flex-col items-center justify-center">
              {/* <span className="text-l items-center text-center text-gray-800">
                  Total Savings:
                </span>
                <span className="text-sm text-gray-500">
                  ${Number(savings).toLocaleString()}
                </span> */}
            </div>
          </div>

          {/* time frame and label */}
          <div className="flex flex-col ml-6 justify-between" id="balance-content">
            <div className="flex flex-col justify-start">
              <div
                id="balance-selection"
                className="flex flex-row justify-between items-center font-bold mb-4"
              >
                <div
                  onClick={() => {
                    setBalanceStartDate(`${year}-${month}-01`);
                    setSelectedReturn("Monthly");
                  }}
                  className={selectedReturn === "Monthly" && timeFrameStyle}
                >
                  Monthly
                </div>
                <div
                  onClick={() => {
                    setBalanceStartDate(`${year}-01-01`);
                    setSelectedReturn("YTD");
                  }}
                  className={selectedReturn === "YTD" && timeFrameStyle}
                >
                  YTD
                </div>
                <div
                  onClick={() => {
                    setBalanceStartDate(`2001-01-01`);
                    setSelectedReturn("Inception");
                  }}
                  className={selectedReturn === "Inception" && timeFrameStyle}
                >
                  Inception
                </div>
              </div>
              <div className="text-md mb-3">
                {" "}
                Total income: ${Number(totalIncome).toLocaleString()}
              </div>
              <div className="text-md mb-3">
                {" "}
                Total expense: ${Number(totalExpense).toLocaleString()}
              </div>
            </div>
            {/* legend */}
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
      </div>
    </DashboardCard>
  );
};

export default Summary;
