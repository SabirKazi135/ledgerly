import { useState } from "react";
import type { ExpenseIconName } from "../../../types/expense";
import {
  EXPENSE_ICON_OPTIONS,
  ExpenseIcon,
} from "./ExpenseIcons";

export type ExpenseFormData = {
  title: string;
  amount: string;
  date: string;
  icon: ExpenseIconName;
};

type AddExpenseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExpenseFormData) => void;
};

function AddExpenseModal({ isOpen, onClose, onSubmit }: AddExpenseModalProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    icon: "other",
  });
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      title: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      icon: "other",
    });
    setIsIconPickerOpen(false);
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.title || !formData.amount || !formData.date) {
      alert("Please fill in all fields");
      return;
    }

    onSubmit(formData);

    setFormData({
      title: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      icon: "other",
    });
    setIsIconPickerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-full w-full max-w-2xl">
        <div className="relative rounded-lg bg-white shadow-sm">
          {/* Modal Header */}
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
            <h3 className="text-lg font-medium text-gray-900">Add Expense</h3>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="space-y-4 p-4 md:p-5">
            <form onSubmit={handleSubmit}>
              {/* Icon Picker */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setIsIconPickerOpen((open) => !open)}
                  aria-expanded={isIconPickerOpen}
                  className="flex items-center gap-4 rounded-lg text-left hover:opacity-80"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-[#16a24a]">
                    <ExpenseIcon name={formData.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">Pick Icon</span>
                    <span className="block text-xs capitalize text-gray-500">
                      {formData.icon}
                    </span>
                  </span>
                </button>

                {isIconPickerOpen && (
                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg border border-gray-200 p-3 sm:grid-cols-3">
                    {EXPENSE_ICON_OPTIONS.map((option) => (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => {
                          setFormData((previous) => ({
                            ...previous,
                            icon: option.name,
                          }));
                          setIsIconPickerOpen(false);
                        }}
                        aria-pressed={formData.icon === option.name}
                        className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition ${
                          formData.icon === option.name
                            ? "border-[#16a24a] bg-green-50 text-[#16833f]"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <ExpenseIcon name={option.name} className="h-4 w-4" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="text-[13px] text-slate-800">Category</label>

                <div className="mt-1 rounded-lg border border-gray-200 px-3 py-2">
                  <input
                    name="title"
                    type="text"
                    placeholder="Rent, Groceries, etc"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    required
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="mt-4">
                <label className="text-[13px] text-slate-800">Amount</label>

                <div className="mt-1 rounded-lg border border-gray-200 px-3 py-2">
                  <input
                    name="amount"
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Date */}
              <div className="mt-4">
                <label className="text-[13px] text-slate-800">Date</label>

                <div className="mt-1 rounded-lg border border-gray-200 px-3 py-2">
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-[#875CF5] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExpenseModal;
