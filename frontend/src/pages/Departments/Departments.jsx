import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import DepartmentTable from './components/DepartmentTable';
import DepartmentSearchBar from './components/DepartmentSearchBar';
import AddNewDepartmentDialog from './components/AddNewDepartmentDialog';

export default function Departments() {
  const [filters, setFilters] = useState({});

  const handleSearch = useCallback((searchFilters) => {
    setFilters(searchFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Departments</h1>
        <AddNewDepartmentDialog
          btn={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          }
        />
      </div>
      <DepartmentSearchBar
        onSearch={handleSearch}
        onClearFilters={handleClearFilters}
      />
      <DepartmentTable filters={filters} />
    </div>
  );
}
