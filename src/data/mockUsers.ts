export interface MockUser {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string | null;
  role: 'user' | 'admin';
  createdAt: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "user1",
    username: "thomas",
    email: "thomas@example.com",
    password: "password123",
    profilePicture: null,
    role: "user",
    createdAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "user2",
    username: "sophie",
    email: "sophie@example.com",
    password: "password456",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophie",
    role: "user",
    createdAt: "2024-03-15T11:00:00Z"
  },
  {
    id: "admin1",
    username: "admin",
    email: "admin@brainbattle.com",
    password: "admin123",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    role: "admin",
    createdAt: "2024-03-15T09:00:00Z"
  }
]; 