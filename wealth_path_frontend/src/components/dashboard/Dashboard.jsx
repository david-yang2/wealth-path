import BudgetGoals from "./BudgetGoals";
import QuickActions from "./QuickActions";
import SpendingInsights from "./SpendingInsights";
import Summary from "./Summary";

const Dashboard = () => {
  return (
    <div>
      <div className="text-3xl font-bold my-3">Dashboard</div>
      <div className="min-h-screen w-full bg-gray-50 p-6 grid gap-6 md:grid-cols-2 rounded-lg">
        <div className="md:col-span-2">
          <Summary />
        </div>

        {/* Row 2 */}
        <SpendingInsights />
        <BudgetGoals />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
