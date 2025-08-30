import { create } from 'zustand';
import api from './api.js';

const useUserStore = create((set) => ({
  loading: false,
  error: null,
  users: [],
  metadata: null,
  currentUser: null,

  getAll: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/user?${queryParams}`);
      set({
        loading: false,
        users: response.data.data.items || response.data.data || response.data,
        metadata: response.data.data.meta || response.data.metadata || null,
      });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch users',
      });
      throw error;
    }
  },

  getById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/user/${id}`);
      set({
        loading: false,
        currentUser: response.data.data || response.data,
      });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch user',
      });
      throw error;
    }
  },

  create: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/user', userData);
      set((state) => ({
        loading: false,
        users: [...state.users, response.data.data || response.data],
      }));
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to create user',
      });
      throw error;
    }
  },

  update: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.patch(`/user/${id}`, userData);
      set((state) => ({
        loading: false,
        users: state.users.map((user) =>
          user.id === id ? response.data.data || response.data : user
        ),
        currentUser:
          state.currentUser?.id === id
            ? response.data.data || response.data
            : state.currentUser,
      }));
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to update user',
      });
      throw error;
    }
  },

  delete: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.delete(`/user/${id}`);
      set((state) => ({
        loading: false,
        users: state.users.filter((user) => user.id !== id),
        currentUser: state.currentUser?.id === id ? null : state.currentUser,
      }));
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to delete user',
      });
      throw error;
    }
  },
}));

export default useUserStore;
