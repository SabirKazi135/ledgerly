export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  amount: number;
  date: string;
  category: string;
  icon?: string;
}

export interface CreateTransactionInput {
  type: TransactionType;
  title: string;
  amount: number;
  date?: string;
  category: string;
  icon?: string;
}

export interface UpdateTransactionInput {
  title?: string;
  amount?: number;
  date?: string;
  category?: string;
  icon?: string;
}
