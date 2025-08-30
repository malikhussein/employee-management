import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function DepartmentSearchBar({ onSearch, onClearFilters }) {
  const [searchQuery, setSearchQuery] = useState('');

  const onSearchRef = useRef(onSearch);

  // Keep the ref updated
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    onClearFilters?.();
  };

  // Auto-trigger search when filters change (debounced)
  useEffect(() => {
    const handleDebouncedSearch = () => {
      const filters = {
        name: searchQuery,
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
  }, [searchQuery]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
      {/* Search Input */}
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="search"
              placeholder="Search by department name..."
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
            disabled={!searchQuery}
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Active Filters Summary */}
      {searchQuery && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <span className="text-sm text-gray-600">Active filters:</span>
          {searchQuery && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              Search: "{searchQuery}"
            </span>
          )}
        </div>
      )}
    </div>
  );
}
