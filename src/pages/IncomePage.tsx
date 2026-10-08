import { useMemo, useState } from "react";
import IncomeOverview, {
  type IncomeChartData,
} from "../features/transactions/components/IncomeOverview";
import IncomeList from "../features/transactions/components/IncomeList";
import AddIncomeModal, {
  type IncomeFormData,
} from "../features/transactions/components/AddIncomeModal";
import type { IncomeTransaction } from "../types/income";

const initialIncomes: IncomeTransaction[] = [
  {
    id: "income-1",
    type: "income",
    title: "Salary",
    category: "Job",
    amount: 3200,
    date: "2026-10-01",
  },
  {
    id: "income-2",
    type: "income",
    title: "Freelance Project",
    category: "Freelance",
    amount: 850,
    date: "2026-09-26",
  },
  {
    id: "income-3",
    type: "income",
    title: "Website Project",
    category: "Freelance",
    amount: 650,
    date: "2026-09-20",
  },
  {
    id: "income-4",
    type: "income",
    title: "Salary",
    category: "Job",
    amount: 3200,
    date: "2026-09-01",
  },
  {
    id: "income-5",
    type: "income",
    title: "Freelance Project",
    category: "Freelance",
    amount: 900,
    date: "2026-08-24",
  },
  {
    id: "income-6",
    type: "income",
    title: "Consulting",
    category: "Business",
    amount: 500,
    date: "2026-08-15",
  },
  {
    id: "income-7",
    type: "income",
    title: "Salary",
    category: "Job",
    amount: 3200,
    date: "2026-08-01",
  },
];

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
  const [incomes, setIncomes] = useState<IncomeTransaction[]>(initialIncomes);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedIncomes = useMemo(() => {
    return [...incomes].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [incomes]);

  const chartData = useMemo<IncomeChartData[]>(() => {
    return sortedIncomes
      .slice(0, 6)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((income) => ({
        date: formatDateForChart(income.date),
        amount: income.amount,
        timestamp: new Date(income.date).getTime(),
      }));
  }, [sortedIncomes]);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleDelete(id: string) {
    const income = incomes.find((item) => item.id === id);

    if (!income) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${income.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    setIncomes((previous) => previous.filter((item) => item.id !== id));
  }

  function handleAddIncome(data: IncomeFormData) {
    const newIncome: IncomeTransaction = {
      id: crypto.randomUUID(),
      type: "income",
      title: data.title,
      category: data.title,
      amount: Number(data.amount),
      date: data.date,
    };

    setIncomes((previous) => [newIncome, ...previous]);

    setIsModalOpen(false);
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <IncomeOverview chartData={chartData} onAddIncome={handleOpenModal} />

      <IncomeList incomes={sortedIncomes} onDelete={handleDelete} />

      <AddIncomeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddIncome}
      />
    </div>
  );
}

export default IncomePage;
