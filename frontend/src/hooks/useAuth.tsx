import * as React from 'react';
import type { AuthContextType, LoginPayload, SignupPayload, User } from '../types/auth';
import { authService } from '../services/auth';
import { useToast } from '../components/ui/toast';

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { showToast } = useToast();

  React.useEffect(() => {
    // Check if token and user exist in localStorage on mount
    const storedToken = localStorage.getItem('forgemind_token');
    const storedUser = localStorage.getItem('forgemind_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse stored user data', err);
        localStorage.removeItem('forgemind_token');
        localStorage.removeItem('forgemind_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const response = await authService.login(payload);
      
      const authToken = response.access_token || response.token || 'mock_jwt_token_forgemind';
      const userData: User = response.user || {
        name: payload.email.split('@')[0],
        email: payload.email,
      };

      setToken(authToken);
      setUser(userData);
      localStorage.setItem('forgemind_token', authToken);
      localStorage.setItem('forgemind_user', JSON.stringify(userData));

      showToast('success', 'Authentication Successful', `Welcome back to ForgeMind AI, ${userData.name}!`);
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Invalid email or password. Please check your credentials.';
      showToast('error', 'Authentication Failed', message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (payload: SignupPayload) => {
    setIsLoading(true);
    try {
      const response = await authService.signup(payload);
      
      const authToken = response.access_token || response.token || 'mock_jwt_token_forgemind';
      const userData: User = response.user || {
        name: payload.name,
        email: payload.email,
      };

      setToken(authToken);
      setUser(userData);
      localStorage.setItem('forgemind_token', authToken);
      localStorage.setItem('forgemind_user', JSON.stringify(userData));

      showToast('success', 'Account Created Successfully', `Welcome to ForgeMind AI, ${userData.name}!`);
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to register account. This email may already be in use.';
      showToast('error', 'Registration Failed', message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('forgemind_token');
    localStorage.removeItem('forgemind_user');
    showToast('info', 'Logged Out', 'You have been securely logged out of your industrial workspace.');
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
