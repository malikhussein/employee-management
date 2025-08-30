import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import EmployeeTable from './components/EmployeeTable';
import SearchBar from './components/SearchBar';
import AddNewEmployeeDialog from './components/AddNewEmployeeDialog';
import useAuthStore from '@/store/auth';

export default function Employees() {
  const [filters, setFilters] = useState({});

  const handleSearch = useCallback((searchFilters) => {
    setFilters(searchFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const { user } = useAuthStore();

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Employees</h1>
        {user?.role === 'admin' && (
          <AddNewEmployeeDialog
            btn={
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            }
          />
        )}
      </div>
      <SearchBar onSearch={handleSearch} onClearFilters={handleClearFilters} />
      <EmployeeTable filters={filters} />
    </div>
  );
}
