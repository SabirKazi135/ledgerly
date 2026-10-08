import BalanceSummary from "../features/dashboard/components/BalanceSummary";
import DashboardCharts from "../features/dashboard/components/DashboardCharts";
import RecentTransactions, {
  type DashboardTransaction,
} from "../features/dashboard/components/RecentTransactions";

// Edit this list to change the dashboard's sample data.
const DUMMY_TRANSACTIONS: DashboardTransaction[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    category: "Food",
    amount: 120,
    date: "2026-10-07",
    type: "expense",
  },
  {
    id: "2",
    title: "Freelance Project",
    category: "Freelance Project",
    amount: 850,
    date: "2026-10-06",
    type: "income",
  },
  {
    id: "3",
    title: "Electricity Bill",
    category: "Bills",
    amount: 95,
    date: "2026-10-05",
    type: "expense",
  },
  {
    id: "4",
    title: "Salary",
    category: "Income",
    amount: 2200,
    date: "2026-10-01",
    type: "income",
  },
  {
    id: "5",
    title: "Internet Bill",
    category: "Bills",
    amount: 60,
    date: "2026-09-29",
    type: "expense",
  },
  {
    id: "6",
    title: "Restaurant",
    category: "Food",
    amount: 75,
    date: "2026-09-26",
    type: "expense",
  },
  {
    id: "7",
    title: "Transportation",
    category: "Transport",
    amount: 45,
    date: "2026-09-24",
    type: "expense",
  },
  {
    id: "8",
    title: "Part-time Work",
    category: "Part-time Work",
    amount: 450,
    date: "2026-09-22",
    type: "income",
  },
  {
    id: "9",
    title: "Freelance Project",
    category: "Freelance Project",
    amount: 600,
    date: "2026-09-15",
    type: "income",
  },
  {
    id: "10",
    title: "Salary",
    category: "Income",
    amount: 2200,
    date: "2026-09-01",
    type: "income",
  },
];

const RECENT_ITEMS_COUNT = 5;

function sumAmounts(transactions: DashboardTransaction[]) {
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

function groupAmountsByCategory(transactions: DashboardTransaction[]) {
  const totals = new Map<string, number>();

  transactions.forEach((transaction) => {
    totals.set(
      transaction.category,
      (totals.get(transaction.category) ?? 0) + transaction.amount,
    );
  });

  return Array.from(totals, ([name, amount]) => ({ name, amount }));
}

function DashboardPage() {
  const sortedTransactions = [...DUMMY_TRANSACTIONS].sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime(),
  );

  const incomes = sortedTransactions.filter(
    (transaction) => transaction.type === "income",
  );
  const expenses = sortedTransactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const recentTransactions = sortedTransactions.slice(0, RECENT_ITEMS_COUNT);
  const recentIncome = incomes.slice(0, RECENT_ITEMS_COUNT);
  const recentExpenses = expenses.slice(0, RECENT_ITEMS_COUNT);

  const totalIncome = sumAmounts(incomes);
  const totalExpense = sumAmounts(expenses);
  const totalBalance = totalIncome - totalExpense;

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
