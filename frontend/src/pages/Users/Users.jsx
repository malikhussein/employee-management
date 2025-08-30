import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import UserTable from './components/UserTable';
import AddNewUserDialog from './components/AddNewUserDialog';
import UserSearchBar from './components/UserSearchBar';
import useAuthStore from '@/store/auth';

export default function Users() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({});
  const { user } = useAuthStore();

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  const handleClearFilters = () => {
    setSearchFilters({});
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        {user?.role === 'admin' && (
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        )}
      </div>

      <UserSearchBar
        onSearch={handleSearch}
        onClearFilters={handleClearFilters}
      />

      <UserTable searchFilters={searchFilters} />

      <AddNewUserDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </div>
  );
}
