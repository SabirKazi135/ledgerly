import {
  Car,
  GraduationCap,
  HeartPulse,
  House,
  Plane,
  Receipt,
  ShoppingCart,
  Smartphone,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { ExpenseIconName } from "../../../types/expense";

const iconComponents: Record<ExpenseIconName, LucideIcon> = {
  food: Utensils,
  shopping: ShoppingCart,
  home: House,
  transport: Car,
  bills: Receipt,
  health: HeartPulse,
  travel: Plane,
  education: GraduationCap,
  phone: Smartphone,
  other: Receipt,
};

export function ExpenseIcon({
  name,
  className,
}: {
  name: ExpenseIconName;
  className?: string;
}) {
  const Icon = iconComponents[name];
  return <Icon className={className} aria-hidden="true" />;
}
