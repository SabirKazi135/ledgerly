import { useMemo, useState } from "react";

import ExpenseOverview, {
  type ExpenseChartData,
} from "../features/transactions/components/ExpenseOverview";

import ExpenseList from "../features/transactions/components/ExpenseList";

import AddExpenseModal, {
  type ExpenseFormData,
} from "../features/transactions/components/AddExpenseModal";
import type { ExpenseTransaction } from "../types/expense";

const initialExpenses: ExpenseTransaction[] = [
  {
    id: "1",
    type: "expense",
    title: "Grocery Shopping",
    category: "Groceries",
    amount: 120,
    date: "2026-10-07",
  },
  {
    id: "2",
    type: "expense",
    title: "Electricity Bill",
    category: "Bills",
    amount: 95,
    date: "2026-10-05",
  },
  {
    id: "3",
    type: "expense",
    title: "Internet Bill",
    category: "Bills",
    amount: 60,
    date: "2026-09-29",
  },
  {
    id: "4",
    type: "expense",
    title: "Restaurant",
    category: "Food",
    amount: 75,
    date: "2026-09-26",
  },
  {
    id: "5",
    type: "expense",
    title: "Transportation",
    category: "Transport",
    amount: 45,
    date: "2026-09-24",
  },
  {
    id: "6",
    type: "expense",
    title: "Shopping",
    category: "Shopping",
    amount: 180,
    date: "2026-09-21",
  },
  {
    id: "7",
    type: "expense",
    title: "Rent",
    category: "Housing",
    amount: 700,
    date: "2026-09-18",
  },
  {
    id: "8",
    type: "expense",
    title: "Fuel",
    category: "Transport",
    amount: 80,
    date: "2026-09-15",
  },
  {
    id: "9",
    type: "expense",
    title: "Movie",
    category: "Entertainment",
    amount: 40,
    date: "2026-09-12",
  },
  {
    id: "10",
    type: "expense",
    title: "Groceries",
    category: "Groceries",
    amount: 110,
    date: "2026-09-10",
  },
  {
    id: "11",
    type: "expense",
    title: "Mobile Bill",
    category: "Bills",
    amount: 35,
    date: "2026-09-07",
  },
];

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
  const [expenses, setExpenses] =
    useState<ExpenseTransaction[]>(initialExpenses);

  const [isModalOpen, setIsModalOpen] = useState(false);

  /*
   * Keep the original behavior:
   * newest expenses first.
   */
  const sortedExpenses = useMemo(() => {
    return [...expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [expenses]);

  /*
   * Keep the original chart behavior:
   * take the latest 11 expenses, then reverse them
   * chronologically for the chart.
   */
  const chartData = useMemo<ExpenseChartData[]>(() => {
    return sortedExpenses
      .slice(0, 11)
      .map((expense) => ({
        date: formatDateForChart(expense.date),
        amount: expense.amount,
        timestamp: new Date(expense.date).getTime(),
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [sortedExpenses]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!confirmed) {
      return;
    }

    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== id),
    );
  };

  const handleAddExpense = (formData: ExpenseFormData) => {
    const newExpense: ExpenseTransaction = {
      id: crypto.randomUUID(),
      type: "expense",
      title: formData.title,
      category: formData.title,
      amount: Number(formData.amount),
      date: formData.date,
    };

    setExpenses((previousExpenses) => [newExpense, ...previousExpenses]);

    handleCloseModal();
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <ExpenseOverview chartData={chartData} onAddExpense={handleOpenModal} />

      <ExpenseList expenses={sortedExpenses} onDelete={handleDelete} />

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddExpense}
      />
    </div>
  );
}

export default ExpensePage;
