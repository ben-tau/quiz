import { MockUser, mockUsers } from '../data/mockUsers';

const STORAGE_KEY = 'brainbattle_auth_user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

// Simule un délai réseau
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 500));

export const authService = {
  async login({ email, password }: LoginCredentials): Promise<MockUser> {
    await simulateDelay();
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new AuthenticationError('Identifiants invalides');
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  async register(data: RegisterData): Promise<MockUser> {
    await simulateDelay();

    if (mockUsers.some(u => u.email === data.email)) {
      throw new AuthenticationError('Cet email est déjà utilisé');
    }

    const newUser: MockUser = {
      id: `user${Date.now()}`,
      username: data.username,
      email: data.email,
      password: data.password,
      profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  async logout(): Promise<void> {
    await simulateDelay();
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser(): Omit<MockUser, 'password'> | null {
    const userData = localStorage.getItem(STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}; 