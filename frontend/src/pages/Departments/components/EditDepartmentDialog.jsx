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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useDepartmentStore from '@/store/department';

// Validation schema for editing department
const editDepartmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
});

export default function EditDepartmentDialog({ btn, department }) {
  const [open, setOpen] = useState(false);
  const { update, loading } = useDepartmentStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editDepartmentSchema),
    defaultValues: {
      name: '',
    },
  });

  // Populate form with department data when dialog opens
  useEffect(() => {
    if (open && department) {
      setValue('name', department.name || '');
    }
  }, [open, department, setValue]);

  const onSubmit = async (data) => {
    try {
      await update(department.id, data);
      reset();
      setOpen(false);
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{btn}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="mb-6 pb-3 border-b">
              <DialogTitle>Edit Department</DialogTitle>
              <DialogDescription>
                Update the department information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Department Name</Label>
                <Input
                  id="name"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                  placeholder="Enter department name"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>
            <DialogFooter className="mt-6 pt-3 border-t flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Department'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
