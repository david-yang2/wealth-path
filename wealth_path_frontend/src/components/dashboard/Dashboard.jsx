import BudgetGoals from "./BudgetGoals";
import QuickActions from "./QuickActions";
import SpendingInsights from "./SpendingInsights";
import Summary from "./Summary";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 grid gap-6 md:grid-cols-2">
      <div className="md:col-span-2">
        <Summary />
      </div>

      {/* Row 2 */}
      <SpendingInsights />
      <BudgetGoals />
      <QuickActions />
    </div>
  );
};

export default Dashboard;
