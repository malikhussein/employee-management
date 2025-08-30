import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import useEmployeeStore from '@/store/employee';

export default function DeleteEmployeeDialog({ btn, employee }) {
  const [open, setOpen] = useState(false);
  const { delete: deleteEmployee, loading } = useEmployeeStore();

  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.id);
      setOpen(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Employee</DialogTitle>
          <DialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete{' '}
              <span className="font-semibold">
                {employee.firstName} {employee.lastName}
              </span>
              ?
            </p>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone. This will permanently delete the
              employee record and remove all associated data.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Employee'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
