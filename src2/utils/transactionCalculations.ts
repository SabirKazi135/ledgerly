import type { Transaction } from "../types/transaction";

export function getRecentTransactions(
  transactions: Transaction[],
  limit = 5,
): Transaction[] {
  return [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getRecentIncome(
  transactions: Transaction[],
  limit = 5,
): Transaction[] {
  return getRecentTransactions(
    transactions.filter((transaction) => transaction.type === "income"),
    limit,
  );
}

export function getRecentExpenses(
  transactions: Transaction[],
  limit = 5,
): Transaction[] {
  return getRecentTransactions(
    transactions.filter((transaction) => transaction.type === "expense"),
    limit,
  );
}

export function getTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
}

export function getTotalExpense(transactions: Transaction[]): number {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
}

export function getTotalBalance(transactions: Transaction[]): number {
  return getTotalIncome(transactions) - getTotalExpense(transactions);
}
