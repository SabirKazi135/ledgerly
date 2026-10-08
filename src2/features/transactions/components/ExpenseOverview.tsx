import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ExpenseChartData = {
  date: string;
  amount: number;
  timestamp: number;
};

type ExpenseOverviewProps = {
  chartData: ExpenseChartData[];
  onAddExpense: () => void;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

function ExpenseOverview({ chartData, onAddExpense }: ExpenseOverviewProps) {
  return (
    <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Expense Overview</h5>

          <p className="mt-0.5 text-xs text-gray-400">
            Track your spending trends over time and gain insights into where
            your money goes.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddExpense}
          className="flex items-center gap-2 rounded-lg bg-[#875CF5] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <div className="bg-white">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="expenseGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />

                  <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

              <XAxis dataKey="date" tick={{ fill: "#555", fontSize: 12 }} />

              <YAxis
                tick={{ fill: "#555", fontSize: 12 }}
                tickFormatter={(value: number) => `$${value}`}
              />

              <Tooltip
                formatter={(value) => formatCurrency(Number(value ?? 0))}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#875cf5"
                strokeWidth={3}
                fill="url(#expenseGradient)"
                fillOpacity={0.6}
                dot={{
                  r: 3,
                  fill: "#ab8df8",
                  fillOpacity: 0.6,
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ExpenseOverview;
