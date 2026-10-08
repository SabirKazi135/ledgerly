import {
  Banknote,
  Briefcase,
  Building2,
  CircleDollarSign,
  Gift,
  HandCoins,
  Landmark,
  Laptop,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import type { IncomeIconName } from "../../../types/income";

const iconComponents: Record<IncomeIconName, LucideIcon> = {
  salary: Briefcase,
  freelance: Laptop,
  business: Building2,
  investment: CircleDollarSign,
  sales: HandCoins,
  bonus: Banknote,
  gift: Gift,
  bank: Landmark,
  other: Receipt,
};

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

export function IncomeIcon({
  name,
  className,
}: {
  name: IncomeIconName;
  className?: string;
}) {
  const Icon = iconComponents[name];
  return <Icon className={className} aria-hidden="true" />;
}
