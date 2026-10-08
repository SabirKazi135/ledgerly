import { useMemo, useState } from "react";
import AddExpenseModal, {
  type ExpenseFormData,
} from "../features/transactions/components/AddExpenseModal";
import ExpenseList from "../features/transactions/components/ExpenseList";
import ExpenseOverview, {
  type ExpenseChartData,
} from "../features/transactions/components/ExpenseOverview";
import { useTransactionStore } from "../features/transactions/transactionStore";
import {
  filterTransactions,
  type TransactionFilters,
} from "../features/transactions/transactionFilters";

const expenseFilters: TransactionFilters = {
  search: "",
  type: "expense",
  category: "all",
  sortBy: "date",
  sortOrder: "desc",
};

function formatDateForChart(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = String(date.getMonth() + 1).padStart(2, "0");
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

function ExpensePage() {
  const transactions = useTransactionStore((state) => state.transactions);
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const expenses = useMemo(
    () => filterTransactions(transactions, expenseFilters),
    [transactions],
  );

  const chartData = useMemo<ExpenseChartData[]>(() => {
    return expenses
      .slice(0, 11)
      .map((expense) => ({
        date: formatDateForChart(expense.date),
        amount: expense.amount,
        timestamp: new Date(expense.date).getTime(),
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [expenses]);

  async function handleAddExpense(formData: ExpenseFormData) {
    const errors = await addTransaction({
      type: "expense",
      title: formData.title,
      category: formData.title,
      amount: Number(formData.amount),
      date: formData.date,
      icon: formData.icon,
    });

    if (errors) {
      alert(Object.values(errors)[0]);
      return;
    }

    setIsModalOpen(false);
  }

  async function handleDelete(id: string) {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await deleteTransaction(id);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <ExpenseOverview
        chartData={chartData}
        onAddExpense={() => setIsModalOpen(true)}
      />
      <ExpenseList expenses={expenses} onDelete={handleDelete} />
      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddExpense}
      />
    </div>
  );
}

export default ExpensePage;
