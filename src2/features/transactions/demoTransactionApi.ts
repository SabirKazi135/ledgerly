import type { PaginatedResponse } from "../../types/api";
import type {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "../../types/transaction";
import { DEMO_TRANSACTIONS } from "./demoTransactions";
import type { GetTransactionsParams } from "./transactionApi";

const STORAGE_KEY = "ledgerly.demo.transactions";
const SESSION_KEY = "ledgerly.auth.session";

function getUserEmail() {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return "guest";
    const user = JSON.parse(session) as { email?: string };
    return user.email || "guest";
  } catch {
    return "guest";
  }
}

function readDatabase(): Record<string, Transaction[]> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function writeDatabase(database: Record<string, Transaction[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(database));
}

function getUserTransactions() {
  const database = readDatabase();
  const email = getUserEmail();

  if (!database[email]) {
    database[email] = email === "demo@finance.com" ? [...DEMO_TRANSACTIONS] : [];
    writeDatabase(database);
  }

  return { database, email, transactions: database[email] };
}

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), 120));
}

export async function demoGetTransactions(
  params: GetTransactionsParams = {},
): Promise<PaginatedResponse<Transaction>> {
  const { transactions } = getUserTransactions();
  let result = [...transactions];

  const search = params.search?.trim().toLowerCase();
  if (search) {
    result = result.filter(
      (transaction) =>
        transaction.title.toLowerCase().includes(search) ||
        transaction.category.toLowerCase().includes(search),
    );
  }

  if (params.type) result = result.filter((item) => item.type === params.type);
  if (params.category) {
    result = result.filter((item) => item.category === params.category);
  }

  const sortBy = params.sortBy ?? "date";
  result.sort((a, b) => {
    const comparison =
      sortBy === "amount"
        ? a.amount - b.amount
        : sortBy === "title"
          ? a.title.localeCompare(b.title)
          : new Date(a.date).getTime() - new Date(b.date).getTime();
    return params.sortOrder === "asc" ? comparison : -comparison;
  });

  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.max((params.limit ?? result.length) || 1, 1);
  const total = result.length;
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  const start = (page - 1) * limit;

  return delay({
    data: result.slice(start, start + limit),
    page,
    limit,
    total,
    totalPages,
  });
}

export async function demoCreateTransaction(
  input: CreateTransactionInput,
): Promise<Transaction> {
  const { database, email, transactions } = getUserTransactions();
  const transaction: Transaction = {
    ...input,
    id: crypto.randomUUID(),
    date: input.date ?? new Date().toISOString(),
  };

  database[email] = [transaction, ...transactions];
  writeDatabase(database);
  return delay(transaction);
}

export async function demoUpdateTransaction(
  id: string,
  input: UpdateTransactionInput,
): Promise<Transaction> {
  const { database, email, transactions } = getUserTransactions();
  const index = transactions.findIndex((transaction) => transaction.id === id);
  if (index === -1) throw new Error("Transaction not found.");

  const updated = { ...transactions[index], ...input };
  database[email] = transactions.map((transaction, currentIndex) =>
    currentIndex === index ? updated : transaction,
  );
  writeDatabase(database);
  return delay(updated);
}

export async function demoDeleteTransaction(id: string): Promise<void> {
  const { database, email, transactions } = getUserTransactions();
  database[email] = transactions.filter((transaction) => transaction.id !== id);
  writeDatabase(database);
  return delay(undefined);
}
