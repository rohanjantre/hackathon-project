export interface User {
  _id?: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  access_token?: string;
  token?: string;
  user?: User;
  message?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginPayload) => Promise<AuthResponse>;
  signup: (data: SignupPayload) => Promise<AuthResponse>;
  logout: () => void;
}
