import api from './api';
import type { User, CreateUserData, UpdateUserData } from '../types/user';

export const userService = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  // Get single user by ID
  getUserById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData: CreateUserData): Promise<User> => {
    const response = await api.post<User>('/users', userData);
    return response.data;
  },

  // Update existing user
  updateUser: async (userData: UpdateUserData): Promise<User> => {
    const { id, ...data } = userData;
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
