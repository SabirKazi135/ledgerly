import type { CreateTransactionInput } from "../../types/transaction";

export interface TransactionValidationErrors {
  title?: string;
  amount?: string;
  category?: string;
  date?: string;
}

export function validateTransaction(
  input: CreateTransactionInput,
): TransactionValidationErrors {
  const errors: TransactionValidationErrors = {};

  if (!input.title.trim()) {
    errors.title = "Title is required";
  }

  if (input.amount <= 0 || !Number.isFinite(input.amount)) {
    errors.amount = "Amount must be greater than 0";
  }

  if (!input.category.trim()) {
    errors.category = "Category is required";
  }

  if (!input.date) {
    errors.date = "Date is required";
  } else {
    const parsedDate = Date.parse(input.date);
    const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(input.date);
    const normalizedDate = Number.isFinite(parsedDate)
      ? new Date(parsedDate).toISOString().slice(0, 10)
      : "";

    if (
      !Number.isFinite(parsedDate) ||
      (isDateOnly && normalizedDate !== input.date)
    ) {
      errors.date = "Enter a valid date";
    }
  }

  return errors;
}
