import { create } from 'zustand';
import api from './api.js';

const useAuthStore = create((set) => ({
  loading: false,
  error: null,
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,

  signUp: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/signup', userData);

      set({
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Sign up failed',
      });
      throw error;
    }
  },

  signIn: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/signin', credentials);
      const { token } = response.data.data;

      set({
        token,
        loading: false,
      });
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Sign in failed',
      });
      throw error;
    }
  },

  getMe: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/auth/me');
      set({
        user: response.data.data,
        loading: false,
      });
      localStorage.setItem('user', JSON.stringify(response.data.data));
      return response.data.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch user',
      });
      throw error;
    }
  },

  changePassword: async (passwordData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/change-password', passwordData);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Password change failed',
      });
      throw error;
    }
  },

  signOut: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      error: null,
    });
  },
}));

export default useAuthStore;
