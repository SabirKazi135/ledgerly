import { useSyncExternalStore } from "react";
import type { AuthResponse, LoginInput, SignupInput, User } from "../../types/auth";

const SESSION_KEY = "ledgerly.auth.session";
const listeners = new Set<() => void>();

function readSession(): User | null {
  try {
    const storedSession = localStorage.getItem(SESSION_KEY);
    if (!storedSession) return null;

    const user: unknown = JSON.parse(storedSession);
    if (
      typeof user === "object" &&
      user !== null &&
      "email" in user &&
      "fullName" in user &&
      typeof user.email === "string" &&
      typeof user.fullName === "string"
    ) {
      return { email: user.email, fullName: user.fullName };
    }
  } catch {
    // Ignore invalid or unavailable browser storage and start signed out.
  }

  return null;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

let currentUser = readSession();

function setUser(user: User | null) {
  currentUser = user;

  try {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Keep the session in memory if browser storage is unavailable.
  }

  notifyListeners();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getNameFromEmail(email: string) {
  if (email === "demo@finance.com") return "Demo User";

  return email
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function login({ email, password }: LoginInput): AuthResponse {
  const normalizedEmail = email.trim().toLowerCase();

  if (!isValidEmail(normalizedEmail)) {
    return { success: false, message: "Enter a valid email address." };
  }

  if (password.length < 4) {
    return { success: false, message: "Password should be at least 4 characters." };
  }

  setUser({ email: normalizedEmail, fullName: getNameFromEmail(normalizedEmail) });
  return { success: true };
}

function signup({ fullName, email, password }: SignupInput): AuthResponse {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = fullName.trim();

  if (!normalizedName) {
    return { success: false, message: "Enter your full name." };
  }

  if (!isValidEmail(normalizedEmail)) {
    return { success: false, message: "Enter a valid email address." };
  }

  if (password.length < 4) {
    return { success: false, message: "Password should be at least 4 characters." };
  }

  setUser({ email: normalizedEmail, fullName: normalizedName });
  return { success: true };
}

function logout() {
  setUser(null);
}

const actions = { login, signup, logout };

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
} & typeof actions;

function getState(): AuthState {
  return {
    user: currentUser,
    isAuthenticated: currentUser !== null,
    ...actions,
  };
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === SESSION_KEY) {
      currentUser = readSession();
      notifyListeners();
    }
  });
}

export function useAuthStore<T>(selector: (state: AuthState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(getState()),
    () => selector(getState()),
  );
}
