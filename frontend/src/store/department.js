import { create } from 'zustand';
import api from './api.js';

const useDepartmentStore = create((set) => ({
  loading: false,
  error: null,
  departments: [],
  metadata: null,
  currentDepartment: null,

  getAll: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/department?${queryParams}`);
      set({
        loading: false,
        departments: response.data.data.items || response.data,
        metadata: response.data.data.meta || null,
      });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch departments',
      });
      throw error;
    }
  },

  getById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/department/${id}`);
      set({
        loading: false,
        currentDepartment: response.data.data || response.data,
      });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch department',
      });
      throw error;
    }
  },

  create: async (departmentData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/department', departmentData);
      set((state) => ({
        loading: false,
        departments: [
          ...state.departments,
          response.data.data || response.data,
        ],
      }));
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to create department',
      });
      throw error;
    }
  },

  update: async (id, departmentData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.patch(`/department/${id}`, departmentData);
      set((state) => ({
        loading: false,
        departments: state.departments.map((dept) =>
          dept.id === id ? response.data.data || response.data : dept
        ),
        currentDepartment:
          state.currentDepartment?.id === id
            ? response.data.data || response.data
            : state.currentDepartment,
      }));
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to update department',
      });
      throw error;
    }
  },

  delete: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.delete(`/department/${id}`);
      set((state) => ({
        loading: false,
        departments: state.departments.filter((dept) => dept.id !== id),
        currentDepartment:
          state.currentDepartment?.id === id ? null : state.currentDepartment,
      }));
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to delete department',
      });
      throw error;
    }
  },

  // Additional utility methods
  setCurrentDepartment: (department) => set({ currentDepartment: department }),
  clearCurrentDepartment: () => set({ currentDepartment: null }),
  clearDepartments: () => set({ departments: [], metadata: null }),

  clearError: () => set({ error: null }),
}));

export default useDepartmentStore;
