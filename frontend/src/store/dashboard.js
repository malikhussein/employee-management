import { create } from 'zustand';
import api from './api.js';

const useDashboardStore = create((set) => ({
  loading: false,
  error: null,
  statistics: null,
  departmentDistribution: [],
  recentHires: [],

  getStatistics: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/dashboard/statistics');
      set({
        loading: false,
        statistics: response.data.data,
      });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message ||
          'Failed to fetch dashboard statistics',
      });
      throw error;
    }
  },

  getDepartmentDistribution: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/dashboard/department-distribution');
      set({
        loading: false,
        departmentDistribution: response.data.data.distribution,
      });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message ||
          'Failed to fetch department distribution',
      });
      throw error;
    }
  },

  getRecentHires: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/dashboard/recent-hires');
      set({
        loading: false,
        recentHires: response.data.data.recentHires,
      });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch recent hires',
      });
      throw error;
    }
  },
}));

export default useDashboardStore;
