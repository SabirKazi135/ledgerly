import BalanceSummary from "../features/dashboard/components/BalanceSummary";
import DashboardCharts from "../features/dashboard/components/DashboardCharts";
import RecentTransactions from "../features/dashboard/components/RecentTransactions";
import { useTransactionStore } from "../features/transactions/transactionStore";
import {
  getRecentExpenses,
  getRecentIncome,
  getRecentTransactions,
  getTotalBalance,
  getTotalExpense,
  getTotalIncome,
} from "../utils/transactionCalculations";

function groupAmountsByCategory(
  transactions: { category: string; amount: number }[],
) {
  const totals = new Map<string, number>();

  transactions.forEach(({ category, amount }) => {
    totals.set(category, (totals.get(category) ?? 0) + amount);
  });

  return Array.from(totals, ([name, amount]) => ({ name, amount }));
}

function DashboardPage() {
  const transactions = useTransactionStore((state) => state.transactions);
  const totalIncome = getTotalIncome(transactions);
  const totalExpense = getTotalExpense(transactions);
  const totalBalance = getTotalBalance(transactions);
  const recentTransactions = getRecentTransactions(transactions);
  const recentExpenses = getRecentExpenses(transactions);
  const recentIncome = getRecentIncome(transactions);

  const financialOverviewData = [
    { name: "Total Balance", amount: totalBalance, color: "#875CF5" },
    { name: "Total Expense", amount: totalExpense, color: "#FA2C37" },
    { name: "Total Income", amount: totalIncome, color: "#FF6900" },
  ];
  const expenseCategories = groupAmountsByCategory(recentExpenses);
  const incomeCategories = groupAmountsByCategory(recentIncome);

  return (
    <div>
      <BalanceSummary
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <RecentTransactions
          recentTransactions={recentTransactions}
          recentExpenses={[]}
          recentIncome={[]}
        />
        <DashboardCharts
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          financialOverviewData={financialOverviewData}
          expenseCategories={[]}
          incomeCategories={[]}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <RecentTransactions
          recentTransactions={[]}
          recentExpenses={recentExpenses}
          recentIncome={[]}
        />
        <DashboardCharts
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          financialOverviewData={[]}
          expenseCategories={expenseCategories}
          incomeCategories={[]}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <DashboardCharts
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          financialOverviewData={[]}
          expenseCategories={[]}
          incomeCategories={incomeCategories}
        />
        <RecentTransactions
          recentTransactions={[]}
          recentExpenses={[]}
          recentIncome={recentIncome}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
