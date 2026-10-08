export type ExpenseTransaction = {
  id: string;
  type: "expense";
  title: string;
  category: string;
  amount: number;
  date: string;
};
