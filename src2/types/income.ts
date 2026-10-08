export const INCOME_ICON_NAMES = [
  "salary",
  "freelance",
  "business",
  "investment",
  "sales",
  "bonus",
  "gift",
  "bank",
  "other",
] as const;

export type IncomeIconName = (typeof INCOME_ICON_NAMES)[number];

export type IncomeTransaction = {
  id: string;
  type: "income";
  title: string;
  category: string;
  amount: number;
  date: string;
  icon?: IncomeIconName;
};
