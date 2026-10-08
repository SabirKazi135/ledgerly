import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "../../types/transaction";
import { DEMO_TRANSACTIONS } from "./demoTransactions";
import {
  validateTransaction,
  type TransactionValidationErrors,
} from "./transactionValidation";

interface TransactionStore {
  transactions: Transaction[];

  updateTransaction: (
    id: string,
    updates: UpdateTransactionInput,
  ) => TransactionValidationErrors | null;
  addTransaction: (
    input: CreateTransactionInput,
  ) => TransactionValidationErrors | null;
  deleteTransaction: (id: string) => void;

  setTransactions: (transactions: Transaction[]) => void;
  clearTransactions: () => void;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: DEMO_TRANSACTIONS,

      addTransaction: (input) => {
        const normalizedInput = {
          ...input,
          date: input.date ?? new Date().toISOString(),
        };
        const errors = validateTransaction(normalizedInput);
        if (Object.keys(errors).length > 0) return errors;

        const transaction: Transaction = {
          ...normalizedInput,
          id: crypto.randomUUID(),
        };

        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
        return null;
      },

      updateTransaction: (id, updates) => {
        let errors: TransactionValidationErrors | null = null;

        set((state) => ({
          transactions: state.transactions.map((transaction) => {
            if (transaction.id !== id) return transaction;

            const updatedTransaction = { ...transaction, ...updates };
            errors = validateTransaction(updatedTransaction);

            if (Object.keys(errors).length > 0) return transaction;
            return updatedTransaction;
          }),
        }));

        return errors;
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== id,
          ),
        }));
      },

      setTransactions: (transactions) => {
        set({ transactions });
      },

      clearTransactions: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: "transaction-storage",
    },
  ),
);
