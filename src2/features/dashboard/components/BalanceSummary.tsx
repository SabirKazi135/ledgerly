type BalanceSummaryProps = {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

function BalanceSummary({
  totalBalance,
  totalIncome,
  totalExpense,
}: BalanceSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Total Balance */}
      <div className="flex items-center gap-6 rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#875CF5] text-[26px] text-white drop-shadow-xl">
          <svg
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
          >
            <path d="M435.2 80H76.8c-24.9 0-44.6 19.6-44.6 44L32 388c0 24.4 19.9 44 44.8 44h358.4c24.9 0 44.8-19.6 44.8-44V124c0-24.4-19.9-44-44.8-44zm0 308H76.8V256h358.4v132zm0-220H76.8v-44h358.4v44z" />
          </svg>
        </div>

        <div>
          <h6 className="mb-1 text-sm text-gray-500">Total Balance</h6>
          <span className="text-[22px] font-semibold">
            {formatCurrency(totalBalance)}
          </span>
        </div>
      </div>

      {/* Total Income */}
      <div className="flex items-center gap-6 rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-[26px] text-white drop-shadow-xl">
          <svg
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
          >
            <path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z" />
          </svg>
        </div>

        <div>
          <h6 className="mb-1 text-sm text-gray-500">Total Income</h6>
          <span className="text-[22px] font-semibold">
            {formatCurrency(totalIncome)}
          </span>
        </div>
      </div>

      {/* Total Expense */}
      <div className="flex items-center gap-6 rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-[26px] text-white drop-shadow-xl">
          <svg
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 640 512"
            height="1em"
            width="1em"
          >
            <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64l241.9 0c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5 608 384c0 35.3-28.7 64-64 64l-241.9 0c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5 32 128c0-35.3 28.7-64 64-64zm64 64l-64 0 0 64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64l64 0 0-64zM320 352a96 96 0 1 0 0-192 96 96 0 0 0 0 192z" />
          </svg>
        </div>

        <div>
          <h6 className="mb-1 text-sm text-gray-500">Total Expense</h6>
          <span className="text-[22px] font-semibold">
            {formatCurrency(totalExpense)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BalanceSummary;
