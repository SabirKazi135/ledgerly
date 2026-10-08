import type { IncomeTransaction } from "../../../types/income";
import { downloadCsv } from "../../../utils/downloadCsv";
import { IncomeIcon } from "./IncomeIcons";

type IncomeListProps = {
  incomes: IncomeTransaction[];
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
  const month = date.toLocaleString("default", { month: "short" });
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

function DeleteIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 11V17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 11V17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6 7L7 19C7.08 19.98 7.9 20.75 8.88 20.75H15.12C16.1 20.75 16.92 19.98 17 19L18 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7V4.75C9 4.34 9.34 4 9.75 4H14.25C14.66 4 15 4.34 15 4.75V7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4V15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 11L12 15L16 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 20H19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IncomeList({ incomes, onDelete }: IncomeListProps) {
  function handleDownload() {
    downloadCsv(
      "income.csv",
      ["Date", "Title", "Category", "Amount"],
      incomes.map((income) => [
        income.date,
        income.title,
        income.category,
        income.amount,
      ]),
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>

        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          <DownloadIcon />
          Download
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2">
        {incomes.map((income) => (
          <div
            key={income.id}
            className="group relative mt-2 flex items-center gap-4 rounded-lg p-3 hover:bg-gray-100/60"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-800">
              <IncomeIcon name={income.icon ?? "other"} className="h-5 w-5" />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {income.title || income.category}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {formatDate(income.date)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onDelete(income.id)}
                  aria-label={`Delete ${income.title}`}
                  className="cursor-pointer text-red-500 transition-opacity group-hover:opacity-100 md:text-gray-400 md:opacity-0 md:hover:text-red-500"
                >
                  <DeleteIcon />
                </button>

                <div className="flex items-center gap-2 rounded-md bg-green-50 px-3 py-1.5 text-green-500">
                  <h6 className="text-xs font-medium">
                    +{formatCurrency(income.amount)}
                  </h6>

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
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncomeList;
