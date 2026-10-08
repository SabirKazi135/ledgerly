import type { Transaction } from "../../../types/transaction";
import { ExpenseIcon } from "./ExpenseIcons";
import type { ExpenseIconName } from "../../../types/expense";
import { EXPENSE_ICON_NAMES } from "../../../types/expense";
import { downloadCsv } from "../../../utils/downloadCsv";

type ExpenseListProps = {
  expenses: Transaction[];
  onDelete: (id: string) => void;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", {
    month: "short",
  });
  const year = date.getFullYear();

  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
          ? "rd"
          : "th";

  return `${day}${suffix} ${month} ${year}`;
}

function getExpenseIconName(icon?: string): ExpenseIconName {
  return EXPENSE_ICON_NAMES.includes(icon as ExpenseIconName)
    ? (icon as ExpenseIconName)
    : "other";
}

function DeleteIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="18"
      width="18"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

function DownArrowIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
    >
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-base"
      height="1em"
      width="1em"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  function handleDownload() {
    downloadCsv(
      "expenses.csv",
      ["Date", "Title", "Category", "Amount"],
      expenses.map((expense) => [
        expense.date,
        expense.title,
        expense.category,
        expense.amount,
      ]),
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expenses</h5>

        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-1 text-sm text-[#875CF5] transition hover:opacity-80"
        >
          <DownloadIcon />
          Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="group relative mt-2 flex items-center gap-4 rounded-lg p-3 hover:bg-gray-100/60"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-800">
              <ExpenseIcon name={getExpenseIconName(expense.icon)} className="h-5 w-5" />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {expense.title || expense.category}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {formatDate(expense.date)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onDelete(expense.id)}
                  aria-label={`Delete ${expense.title}`}
                  className="cursor-pointer text-red-500 transition-opacity md:text-gray-400 md:opacity-0 md:group-hover:opacity-100 md:hover:text-red-500"
                >
                  <DeleteIcon />
                </button>

                <div className="flex items-center gap-2 rounded-md bg-red-50 px-3 py-1.5 text-red-500">
                  <h6 className="text-xs font-medium">
                    -{formatCurrency(expense.amount)}
                  </h6>

                  <DownArrowIcon />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
