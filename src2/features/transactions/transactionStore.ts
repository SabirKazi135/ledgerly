import { create } from "zustand";
import type {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "../../types/transaction";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "./transactionApi";
import {
  validateTransaction,
  type TransactionValidationErrors,
} from "./transactionValidation";

interface TransactionStore {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  loadTransactions: () => Promise<void>;
  addTransaction: (
    input: CreateTransactionInput,
  ) => Promise<TransactionValidationErrors | null>;
  updateTransaction: (
    id: string,
    updates: UpdateTransactionInput,
  ) => Promise<TransactionValidationErrors | null>;
  deleteTransaction: (id: string) => Promise<void>;
  clearTransactions: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  loadTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getTransactions({
        page: 1,
        limit: 100,
        sortBy: "date",
        sortOrder: "desc",
      });
      set({ transactions: response.data });
    } catch (requestError) {
      set({
        error:
          requestError instanceof Error
            ? requestError.message
            : "Unable to load transactions.",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addTransaction: async (input) => {
    const normalizedInput = {
      ...input,
      date: input.date ?? new Date().toISOString(),
    };
    const errors = validateTransaction(normalizedInput);
    if (Object.keys(errors).length > 0) return errors;

    try {
      const transaction = await createTransaction(normalizedInput);
      set((state) => ({
        transactions: [transaction, ...state.transactions],
        error: null,
      }));
      return null;
    } catch (requestError) {
      set({ error: requestError instanceof Error ? requestError.message : "Unable to add transaction." });
      return { title: "Unable to save transaction." };
    }
  },

  updateTransaction: async (id, updates) => {
    try {
      const current = await getTransactions({ page: 1, limit: 100 });
      const existing = current.data.find((transaction) => transaction.id === id);
      if (!existing) return { title: "Transaction not found." };

      const errors = validateTransaction({ ...existing, ...updates });
      if (Object.keys(errors).length > 0) return errors;

      const transaction = await updateTransaction(id, updates);
      set((state) => ({
        transactions: state.transactions.map((item) =>
          item.id === id ? transaction : item,
        ),
        error: null,
      }));
      return null;
    } catch (requestError) {
      set({ error: requestError instanceof Error ? requestError.message : "Unable to update transaction." });
      return { title: "Unable to update transaction." };
    }
  },

  deleteTransaction: async (id) => {
    try {
      await deleteTransaction(id);
      set((state) => ({
        transactions: state.transactions.filter((transaction) => transaction.id !== id),
        error: null,
      }));
    } catch (requestError) {
      set({ error: requestError instanceof Error ? requestError.message : "Unable to delete transaction." });
    }
  },

  clearTransactions: () => set({ transactions: [], error: null }),
}));
