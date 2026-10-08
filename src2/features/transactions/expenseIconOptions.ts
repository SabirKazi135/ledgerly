import type { ExpenseIconName } from "../../types/expense";

export const EXPENSE_ICON_OPTIONS: {
  name: ExpenseIconName;
  label: string;
}[] = [
  { name: "food", label: "Food" },
  { name: "shopping", label: "Shopping" },
  { name: "home", label: "Home" },
  { name: "transport", label: "Transport" },
  { name: "bills", label: "Bills" },
  { name: "health", label: "Health" },
  { name: "travel", label: "Travel" },
  { name: "education", label: "Education" },
  { name: "phone", label: "Phone" },
  { name: "other", label: "Other" },
];
