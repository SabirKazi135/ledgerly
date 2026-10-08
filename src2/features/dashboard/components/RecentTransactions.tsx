import { useNavigate } from "react-router-dom";

export type DashboardTransaction = {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
};

type RecentTransactionsProps = {
  recentTransactions: DashboardTransaction[];
  recentExpenses: DashboardTransaction[];
  recentIncome: DashboardTransaction[];
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

function ArrowIcon({ direction }: { direction: "up" | "down" }) {
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
      {direction === "up" ? (
        <>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </>
      ) : (
        <>
          <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
          <polyline points="16 17 22 17 22 11" />
        </>
      )}
    </svg>
  );
}

function TransactionIcon() {
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
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function SeeAllButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 text-sm text-[#875CF5] transition hover:opacity-80"
      onClick={onClick}
    >
      See All
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
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </button>
  );
}

function TransactionRow({
  transaction,
}: {
  transaction: DashboardTransaction;
}) {
  const isIncome = transaction.type === "income";

  return (
    <div className="group relative mt-2 flex items-center gap-4 rounded-lg p-3 hover:bg-gray-100/60">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-800">
        <TransactionIcon />
      </div>

      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">
            {transaction.title}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {formatDate(transaction.date)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 ${
              isIncome ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"
            }`}
          >
            <h6 className="text-xs font-medium">
              {isIncome ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </h6>

            <ArrowIcon direction={isIncome ? "up" : "down"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentTransactions({
  recentTransactions,
  recentExpenses,
  recentIncome,
}: RecentTransactionsProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Recent Transactions */}
      {recentTransactions.length > 0 && (
      <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
        <div className="flex items-center justify-between">
          <h5 className="text-lg">Recent Transactions</h5>

          <SeeAllButton onClick={() => navigate("/expense")} />
        </div>

        <div className="mt-6">
          {recentTransactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
      )}

      {/* Expenses */}
      {recentExpenses.length > 0 && (
      <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
        <div className="flex items-center justify-between">
          <h5 className="text-lg">Expenses</h5>

          <SeeAllButton onClick={() => navigate("/expense")} />
        </div>

        <div className="mt-6">
          {recentExpenses.map((expense) => (
            <TransactionRow key={expense.id} transaction={expense} />
          ))}
        </div>
      </div>
      )}

      {/* Recent Income */}
      {recentIncome.length > 0 && (
      <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
        <div className="flex items-center justify-between">
          <h5 className="text-lg">Recent Income</h5>

          <SeeAllButton onClick={() => navigate("/income")} />
        </div>

        <div className="mt-6">
          {recentIncome.map((income) => (
            <TransactionRow key={income.id} transaction={income} />
          ))}
        </div>
      </div>
      )}
    </>
  );
}

export default RecentTransactions;
