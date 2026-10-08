import { useSyncExternalStore } from "react";
import type { AuthResponse, LoginInput, SignupInput, User } from "../../types/auth";
import { loginUser, logoutUser, signupUser } from "./authApi";

const SESSION_KEY = "ledgerly.auth.session";
const TOKEN_KEY = "ledgerly.auth.token";
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
    // Ignore invalid browser storage.
  }

  return null;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

let currentUser = readSession();
let isLoading = false;
let error: string | null = null;

function setSession(user: User | null, token: string | null = null) {
  currentUser = user;

  try {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);

    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (!user) localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Keep the session in memory if browser storage is unavailable.
  }

  notifyListeners();
}

async function login(input: LoginInput): Promise<AuthResponse> {
  isLoading = true;
  error = null;
  notifyListeners();

  try {
    const response = await loginUser(input);
    setSession(response.user, response.token);
    return { success: true };
  } catch (requestError) {
    error = requestError instanceof Error ? requestError.message : "Unable to login.";
    return { success: false, message: error };
  } finally {
    isLoading = false;
    notifyListeners();
  }
}

async function signup(input: SignupInput): Promise<AuthResponse> {
  isLoading = true;
  error = null;
  notifyListeners();

  try {
    const response = await signupUser(input);
    setSession(response.user, response.token);
    return { success: true };
  } catch (requestError) {
    error = requestError instanceof Error ? requestError.message : "Unable to sign up.";
    return { success: false, message: error };
  } finally {
    isLoading = false;
    notifyListeners();
  }
}

async function logout(): Promise<void> {
  try {
    await logoutUser();
  } finally {
    setSession(null);
    error = null;
  }
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: typeof login;
  signup: typeof signup;
  logout: typeof logout;
};

function getState(): AuthState {
  return {
    user: currentUser,
    isAuthenticated: currentUser !== null,
    isLoading,
    error,
    login,
    signup,
    logout,
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
