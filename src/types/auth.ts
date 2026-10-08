export type AuthUser = {
  fullName: string;
  email: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupDetails = LoginCredentials & {
  fullName: string;
};

export type AuthResult = {
  success: boolean;
  message?: string;
};
