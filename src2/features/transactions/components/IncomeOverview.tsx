import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type IncomeChartData = {
  date: string;
  amount: number;
  timestamp: number;
};

type IncomeOverviewProps = {
  chartData: IncomeChartData[];
  onAddIncome: () => void;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

function IncomeOverview({ chartData, onAddIncome }: IncomeOverviewProps) {
  return (
    <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>

          <p className="mt-0.5 text-xs text-gray-400">
            Track your earning over time and analyze your income trends.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddIncome}
          className="flex items-center gap-2 rounded-lg bg-[#16a24a] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <div className="bg-white">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="date"
                tick={{
                  fill: "#555",
                  fontSize: 12,
                }}
              />

              <YAxis
                tick={{
                  fill: "#555",
                  fontSize: 12,
                }}
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

              <Bar dataKey="amount" radius={[10, 10, 0, 0]} fill="#875cf5">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`${entry.timestamp}-${index}`}
                    fill={index % 2 === 0 ? "#875cf5" : "#cfbefb"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default IncomeOverview;
