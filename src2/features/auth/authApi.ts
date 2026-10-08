import { apiClient } from "../../lib/apiClient";
import type { AuthResponse, LoginInput, SignupInput, User } from "../../types/auth";
import { demoLogin, demoLogout, demoSignup } from "./demoAuthApi";

export interface AuthApiResponse {
  user: User;
  token: string;
}

const useDemoApi = import.meta.env.VITE_API_MODE !== "http";

export async function loginUser(input: LoginInput): Promise<AuthApiResponse> {
  if (useDemoApi) return demoLogin(input);

  return apiClient<AuthApiResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function signupUser(input: SignupInput): Promise<AuthApiResponse> {
  if (useDemoApi) return demoSignup(input);

  return apiClient<AuthApiResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function logoutUser(): Promise<AuthResponse> {
  if (useDemoApi) return demoLogout();

  return apiClient<AuthResponse>("/auth/logout", {
    method: "POST",
  });
}
