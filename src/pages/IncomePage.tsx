import { useMemo, useState } from "react";
import AddIncomeModal, {
  type IncomeFormData,
} from "../features/transactions/components/AddIncomeModal";
import IncomeList from "../features/transactions/components/IncomeList";
import IncomeOverview, {
  type IncomeChartData,
} from "../features/transactions/components/IncomeOverview";
import {
  filterTransactions,
  type TransactionFilters,
} from "../features/transactions/transactionFilters";
import { useTransactionStore } from "../features/transactions/transactionStore";

const incomeFilters: TransactionFilters = {
  search: "",
  type: "income",
  category: "all",
  sortBy: "date",
  sortOrder: "desc",
};

function formatDateForChart(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
          ? "rd"
          : "th";

  return `${day}${suffix} ${month}`;
}

function IncomePage() {
  const transactions = useTransactionStore((state) => state.transactions);
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const incomes = useMemo(
    () => filterTransactions(transactions, incomeFilters),
    [transactions],
  );

  const chartData = useMemo<IncomeChartData[]>(() => {
    return incomes
      .slice(0, 6)
      .map((income) => ({
        date: formatDateForChart(income.date),
        amount: income.amount,
        timestamp: new Date(income.date).getTime(),
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [incomes]);

  function handleAddIncome(data: IncomeFormData) {
    const errors = addTransaction({
      type: "income",
      title: data.title,
      category: data.title,
      amount: Number(data.amount),
      date: data.date,
      icon: data.icon,
    });

    if (errors) {
      alert(Object.values(errors)[0]);
      return;
    }

    setIsModalOpen(false);
  }

  function handleDelete(id: string) {
    const income = incomes.find((item) => item.id === id);
    if (!income) return;

    if (window.confirm(`Are you sure you want to delete "${income.title}"?`)) {
      deleteTransaction(id);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <IncomeOverview
        chartData={chartData}
        onAddIncome={() => setIsModalOpen(true)}
      />
      <IncomeList incomes={incomes} onDelete={handleDelete} />
      <AddIncomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddIncome}
      />
    </div>
  );
}

export default IncomePage;
