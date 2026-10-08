export type IncomeTransaction = {
  id: string;
  type: "income";
  title: string;
  category: string;
  amount: number;
  date: string;
};
