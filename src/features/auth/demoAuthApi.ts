import type { LoginInput, SignupInput, User } from "../../types/auth";

export interface DemoAuthResponse {
  user: User;
  token: string;
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

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateCredentials(email: string, password: string) {
  if (!validateEmail(email)) {
    throw new Error("Enter a valid email address.");
  }

  if (password.length < 4) {
    throw new Error("Password should be at least 4 characters.");
  }
}

function createDemoToken(email: string) {
  return `demo-token:${email}`;
}

export async function demoLogin(input: LoginInput): Promise<DemoAuthResponse> {
  const email = input.email.trim().toLowerCase();
  validateCredentials(email, input.password);

  return {
    user: {
      email,
      fullName: getNameFromEmail(email),
    },
    token: createDemoToken(email),
  };
}

export async function demoSignup(
  input: SignupInput,
): Promise<DemoAuthResponse> {
  const fullName = input.fullName.trim();
  const email = input.email.trim().toLowerCase();

  if (!fullName) throw new Error("Enter your full name.");

  validateCredentials(email, input.password);

  return {
    user: { fullName, email },
    token: createDemoToken(email),
  };
}

export async function demoLogout() {
  return { success: true };
}
