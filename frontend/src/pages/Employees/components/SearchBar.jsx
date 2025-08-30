import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ControlledDatePicker } from '@/components/ui/controlled-datepicker';
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import useDepartmentStore from '@/store/department';

export default function SearchBar({ onSearch, onClearFilters }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [hireDateFrom, setHireDateFrom] = useState(null);
  const [hireDateTo, setHireDateTo] = useState(null);

  const { departments, getAll: getDepartments } = useDepartmentStore();
  const onSearchRef = useRef(onSearch);

  // Keep the ref updated
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Load departments when component mounts
  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('all');
    setMinSalary('');
    setMaxSalary('');
    setHireDateFrom(null);
    setHireDateTo(null);
    onClearFilters?.();
  };

  // Auto-trigger search when filters change (debounced)
  useEffect(() => {
    const handleDebouncedSearch = () => {
      const filters = {
        search: searchQuery,
        departmentId:
          selectedDepartment !== 'all' ? selectedDepartment : undefined,
        minSalary: minSalary ? Number(minSalary) : undefined,
        maxSalary: maxSalary ? Number(maxSalary) : undefined,
        hireDateFrom: hireDateFrom
          ? hireDateFrom.toISOString().split('T')[0]
          : undefined,
        hireDateTo: hireDateTo
          ? hireDateTo.toISOString().split('T')[0]
          : undefined,
      };

      // Remove undefined values
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== undefined && v !== '')
      );

      // Always call onSearch, even with empty filters to reset the table
      onSearchRef.current?.(cleanFilters);
    };

    const timer = setTimeout(() => {
      handleDebouncedSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [
    searchQuery,
    selectedDepartment,
    minSalary,
    maxSalary,
    hireDateFrom,
    hireDateTo,
  ]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
      {/* Search Input */}
      <div className="flex gap-3">
        <div className="flex-1">
          <Label htmlFor="search" className="text-sm font-medium mb-2 block">
            Search Employees
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="search"
              placeholder="Search by name, email, or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="h-10"
            disabled={
              !searchQuery &&
              selectedDepartment === 'all' &&
              !minSalary &&
              !maxSalary &&
              !hireDateFrom &&
              !hireDateTo
            }
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Department Filter */}
        <div>
          <Label
            htmlFor="department"
            className="text-sm font-medium mb-2 block"
          >
            Department
          </Label>
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments?.map((department) => (
                <SelectItem
                  key={department.id}
                  value={department.id.toString()}
                >
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div>
          <Label htmlFor="minSalary" className="text-sm font-medium mb-2 block">
            Min Salary
          </Label>
          <Input
            id="minSalary"
            type="number"
            placeholder="0"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="maxSalary" className="text-sm font-medium mb-2 block">
            Max Salary
          </Label>
          <Input
            id="maxSalary"
            type="number"
            placeholder="No limit"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
          />
        </div>

        {/* Hire Date Range */}
        <div>
          <Label
            htmlFor="hireDateFrom"
            className="text-sm font-medium mb-2 block"
          >
            Hired From
          </Label>
          <ControlledDatePicker
            date={hireDateFrom}
            onDateChange={setHireDateFrom}
            placeholder="Select start date"
          />
        </div>
        <div>
          <Label
            htmlFor="hireDateTo"
            className="text-sm font-medium mb-2 block"
          >
            Hired To
          </Label>
          <ControlledDatePicker
            date={hireDateTo}
            onDateChange={setHireDateTo}
            placeholder="Select end date"
          />
        </div>
      </div>

      {/* Active Filters Summary */}
      {(searchQuery ||
        (selectedDepartment && selectedDepartment !== 'all') ||
        minSalary ||
        maxSalary ||
        hireDateFrom ||
        hireDateTo) && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <span className="text-sm text-gray-600">Active filters:</span>
          {searchQuery && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              Search: "{searchQuery}"
            </span>
          )}
          {selectedDepartment && selectedDepartment !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              Department:{' '}
              {
                departments?.find((d) => d.id.toString() === selectedDepartment)
                  ?.name
              }
            </span>
          )}
          {minSalary && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
              Min Salary: ${minSalary}
            </span>
          )}
          {maxSalary && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
              Max Salary: ${maxSalary}
            </span>
          )}
          {hireDateFrom && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
              From: {hireDateFrom.toLocaleDateString()}
            </span>
          )}
          {hireDateTo && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
              To: {hireDateTo.toLocaleDateString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
