import type { Transaction, TransactionType } from "../../types/transaction";

export interface TransactionFilters {
  search: string;
  type: TransactionType | "all";
  category: string;
  sortBy: "date" | "amount" | "title";
  sortOrder: "asc" | "desc";
}

const compareValues = (
  a: Transaction,
  b: Transaction,
  sortBy: TransactionFilters["sortBy"],
): number => {
  if (sortBy === "date") {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  }

  if (sortBy === "amount") {
    return a.amount - b.amount;
  }

  return a.title.localeCompare(b.title);
};

export function filterTransactions(
  transactions: Transaction[],
  filters: TransactionFilters,
): Transaction[] {
  const search = filters.search.trim().toLowerCase();

  return transactions
    .filter((transaction) => {
      if (filters.type !== "all" && transaction.type !== filters.type) {
        return false;
      }

      if (
        filters.category !== "all" &&
        transaction.category !== filters.category
      ) {
        return false;
      }

      if (
        search &&
        !transaction.title.toLowerCase().includes(search) &&
        !transaction.category.toLowerCase().includes(search)
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const result = compareValues(a, b, filters.sortBy);

      return filters.sortOrder === "asc" ? result : -result;
    });
}
