import { create } from 'zustand';
import api from './api.js';

const useEmployeeStore = create((set) => ({
  loading: false,
  error: null,
  employees: [],
  metadata: null,
  currentEmployee: null,

  getAll: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/employee?${queryParams}`);
      set({
        loading: false,
        employees: response.data.data || response.data,
        metadata: response.data.metadata || null,
      });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch employees',
      });
      throw error;
    }
  },

  getById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/employee/${id}`);
      set({
        loading: false,
        currentEmployee: response.data.data || response.data,
      });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch employee',
      });
      throw error;
    }
  },

  create: async (employeeData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/employee', employeeData);
      set((state) => ({
        loading: false,
        employees: [...state.employees, response.data.data || response.data],
      }));
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to create employee',
      });
      throw error;
    }
  },

  update: async (id, employeeData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.patch(`/employee/${id}`, employeeData);
      set((state) => ({
        loading: false,
        employees: state.employees.map((emp) =>
          emp.id === id ? response.data.data || response.data : emp
        ),
        currentEmployee:
          state.currentEmployee?.id === id
            ? response.data.data || response.data
            : state.currentEmployee,
      }));
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to update employee',
      });
      throw error;
    }
  },

  delete: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.delete(`/employee/${id}`);
      set((state) => ({
        loading: false,
        employees: state.employees.filter((emp) => emp.id !== id),
        currentEmployee:
          state.currentEmployee?.id === id ? null : state.currentEmployee,
      }));
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to delete employee',
      });
      throw error;
    }
  },
}));

export default useEmployeeStore;
