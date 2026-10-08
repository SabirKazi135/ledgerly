import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartData = {
  name: string;
  amount: number;
  color?: string;
};

type DashboardChartsProps = {
  totalBalance: number;
  totalIncome: number;
  financialOverviewData: ChartData[];
  expenseCategories: ChartData[];
  incomeCategories: ChartData[];
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

const chartCardClass =
  "rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100";

const tooltipStyle = {
  backgroundColor: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
};

const incomeColors: Record<string, string> = {
  "Freelance Project": "#FF6900",
  Income: "#875CF5",
  "Part-time Work": "#4f39f6",
};

function DashboardCharts({
  totalBalance,
  totalIncome,
  financialOverviewData,
  expenseCategories,
  incomeCategories,
}: DashboardChartsProps) {
  return (
    <>
      {/* Financial Overview */}
      {financialOverviewData.length > 0 && (
      <div className={chartCardClass}>
        <div className="flex items-center justify-between">
          <h5 className="text-lg">Financial Overview</h5>
        </div>

        <div>
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Pie
                data={financialOverviewData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={130}
                innerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {financialOverviewData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color ?? "#875CF5"} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={tooltipStyle}
              />

              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span className="text-xs font-medium text-gray-700">
                    {value}
                  </span>
                )}
              />

              <text
                x="50%"
                y="50%"
                dy={-25}
                textAnchor="middle"
                fill="#666"
                fontSize="14px"
              >
                Total Balance
              </text>

              <text
                x="50%"
                y="50%"
                dy={8}
                textAnchor="middle"
                fill="#333"
                fontSize="24px"
                fontWeight="600"
              >
                {formatCurrency(totalBalance)}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      )}

      {/* Last 30 Days Expenses */}
      {expenseCategories.length > 0 && (
      <div className={chartCardClass}>
        <div className="flex items-center justify-between">
          <h5 className="text-lg">Last 30 Days Expenses</h5>
        </div>

        <div className="mt-6 bg-white">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenseCategories}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

              <XAxis
                dataKey="name"
                tick={{ fill: "#555", fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />

              <YAxis
                tick={{ fill: "#555", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />

              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={tooltipStyle}
              />

              <Bar dataKey="amount" radius={[10, 10, 0, 0]} fill="#875cf5">
                {expenseCategories.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? "#875cf5" : "#cfbefb"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      )}

      {/* Last 60 Days Income */}
      {incomeCategories.length > 0 && (
      <div className={chartCardClass}>
        <div className="flex items-center justify-between">
          <h5 className="text-lg">Last 60 Days Income</h5>
        </div>

        <div>
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Pie
                data={incomeCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={130}
                innerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {incomeCategories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      incomeColors[entry.name] ??
                      ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"][index % 4]
                    }
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={tooltipStyle}
              />

              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span className="text-xs font-medium text-gray-700">
                    {value}
                  </span>
                )}
              />

              <text
                x="50%"
                y="50%"
                dy={-25}
                textAnchor="middle"
                fill="#666"
                fontSize="14px"
              >
                Total Income
              </text>

              <text
                x="50%"
                y="50%"
                dy={8}
                textAnchor="middle"
                fill="#333"
                fontSize="24px"
                fontWeight="600"
              >
                {formatCurrency(totalIncome)}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      )}
    </>
  );
}

export default DashboardCharts;
