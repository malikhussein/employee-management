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
import React, { useState, useEffect } from 'react';
import { DatePicker } from '@/components/ui/datepicker';
import { ControlledDatePicker } from '@/components/ui/controlled-datepicker';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useEmployeeStore from '@/store/employee';
import useDepartmentStore from '@/store/department';

// Simplified validation schema
const employeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  salary: z.number().min(0, 'Salary must be a positive number'),
  hireDate: z.date('Hire date is required'),
  departmentId: z.string().min(1, 'Department is required'),
});

export default function AddNewEmployeeDialog({ btn }) {
  const [open, setOpen] = useState(false);
  const { create, loading } = useEmployeeStore();
  const { departments, getAll: getDepartments } = useDepartmentStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      salary: 0,
      hireDate: undefined,
      departmentId: '',
    },
  });

  // Debug: Watch the hireDate value
  const hireDateValue = watch('hireDate');
  console.log('Hire Date Value:', hireDateValue);

  // Debug: Watch the departmentId value
  const departmentIdValue = watch('departmentId');
  console.log('Department ID Value:', departmentIdValue);
  console.log('Departments:', departments);

  // Load departments when component mounts
  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    try {
      // Ensure the date is properly formatted for the API
      const formattedData = {
        ...data,
        hireDate: data.hireDate ? data.hireDate.toISOString() : null,
      };
      await create(formattedData);
      reset();
      setOpen(false);
    } catch (error) {
      console.error('Error creating employee:', error);
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
              <DialogTitle>Add Employee</DialogTitle>
              <DialogDescription>
                Fill in the details of the new employee.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  type="number"
                  id="salary"
                  {...register('salary', { valueAsNumber: true })}
                  className={errors.salary ? 'border-red-500' : ''}
                />
                {errors.salary && (
                  <span className="text-red-500 text-sm">
                    {errors.salary.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="hireDate">Hire Date</Label>
                <Controller
                  name="hireDate"
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    console.log('Controller field value:', value);
                    console.log('Controller field onChange:', onChange);
                    return (
                      <ControlledDatePicker
                        date={value}
                        onDateChange={(selectedDate) => {
                          console.log(
                            'DatePicker selected date:',
                            selectedDate
                          );
                          onChange(selectedDate);
                        }}
                        className={errors.hireDate ? 'border-red-500' : ''}
                        placeholder="Select hire date"
                      />
                    );
                  }}
                />
                {errors.hireDate && (
                  <span className="text-red-500 text-sm">
                    {errors.hireDate.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="departmentId">Department</Label>
                <Controller
                  name="departmentId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={`w-full ${
                          errors.departmentId ? 'border-red-500' : ''
                        }`}
                      >
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
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
                  )}
                />
                {errors.departmentId && (
                  <span className="text-red-500 text-sm">
                    {errors.departmentId.message}
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
                {loading ? 'Saving...' : 'Save changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
