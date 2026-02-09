import BudgetGoals from "./BudgetGoals";
import QuickActions from "./QuickActions";
import SpendingInsights from "./SpendingInsights";
import Summary from "./Summary";
import DashboardTransaction from "./DashboardTransaction";

const Dashboard = () => {
  // current date

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const currentDateStr = `${year}-${month}-${day}`

  return (
    <div
      id="dashboard-container"
      className="w-full min-h-screen flex justify-center bg-gray-50 px-6 py-8"
    >
      <div className="w-full max-w-7xl flex flex-col gap-8">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

          <span className="text-sm text-gray-500">
            Today • {currentDateStr}
          </span>
        </div>

        {/* components */}
        <div className=" w-full p-6 grid gap-6 grid-cols-1 md:grid-cols-2 rounded-2xl">
          <Summary currentDateStr={currentDateStr} year={year} month={month}/>
          <SpendingInsights year={year} month={month} day={day} />

          {/* Row 2 */}
          <div className="col-span-1 md:col-span-2 overflow-auto">
            <DashboardTransaction />
          </div>
          {/* <BudgetGoals />
        <QuickActions /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
