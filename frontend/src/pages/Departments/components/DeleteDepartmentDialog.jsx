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
import useDepartmentStore from '@/store/department';

export default function DeleteDepartmentDialog({ btn, department }) {
  const [open, setOpen] = useState(false);
  const { delete: deleteDepartment, loading } = useDepartmentStore();

  const handleDelete = async () => {
    try {
      await deleteDepartment(department.id);
      setOpen(false);
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Department</DialogTitle>
          <DialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete the department{' '}
              <span className="font-semibold">"{department.name}"</span>?
            </p>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone. This will permanently delete the
              department and may affect associated employees.
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
            {loading ? 'Deleting...' : 'Delete Department'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
