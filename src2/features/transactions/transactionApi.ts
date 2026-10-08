import { apiClient } from "../../lib/apiClient";
import type {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "../../types/transaction";
import type { PaginatedResponse } from "../../types/api";
import {
  demoCreateTransaction,
  demoDeleteTransaction,
  demoGetTransactions,
  demoUpdateTransaction,
} from "./demoTransactionApi";

export interface GetTransactionsParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: "income" | "expense";
  category?: string;
  sortBy?: "date" | "amount" | "title";
  sortOrder?: "asc" | "desc";
}

const useDemoApi = import.meta.env.VITE_API_MODE !== "http";

function buildQuery(params: GetTransactionsParams) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") searchParams.set(key, String(value));
  });
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export function getTransactions(
  params: GetTransactionsParams = {},
): Promise<PaginatedResponse<Transaction>> {
  if (useDemoApi) return demoGetTransactions(params);
  return apiClient<PaginatedResponse<Transaction>>(
    `/transactions${buildQuery(params)}`,
  );
}

export function createTransaction(
  input: CreateTransactionInput,
): Promise<Transaction> {
  if (useDemoApi) return demoCreateTransaction(input);
  return apiClient<Transaction>("/transactions", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateTransaction(
  id: string,
  input: UpdateTransactionInput,
): Promise<Transaction> {
  if (useDemoApi) return demoUpdateTransaction(id, input);
  return apiClient<Transaction>(`/transactions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteTransaction(id: string): Promise<void> {
  if (useDemoApi) return demoDeleteTransaction(id);
  return apiClient<void>(`/transactions/${id}`, { method: "DELETE" });
}
