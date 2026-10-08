export const EXPENSE_ICON_NAMES = [
  "food",
  "shopping",
  "home",
  "transport",
  "bills",
  "health",
  "travel",
  "education",
  "phone",
  "other",
] as const;

export type ExpenseIconName = (typeof EXPENSE_ICON_NAMES)[number];

export type ExpenseTransaction = {
  id: string;
  type: "expense";
  title: string;
  category: string;
  amount: number;
  date: string;
  icon?: ExpenseIconName;
};
