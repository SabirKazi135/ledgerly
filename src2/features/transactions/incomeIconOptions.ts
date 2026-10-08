import type { IncomeIconName } from "../../types/income";

export const INCOME_ICON_OPTIONS: {
  name: IncomeIconName;
  label: string;
}[] = [
  { name: "salary", label: "Salary" },
  { name: "freelance", label: "Freelance" },
  { name: "business", label: "Business" },
  { name: "investment", label: "Investment" },
  { name: "sales", label: "Sales" },
  { name: "bonus", label: "Bonus" },
  { name: "gift", label: "Gift" },
  { name: "bank", label: "Bank" },
  { name: "other", label: "Other" },
];
