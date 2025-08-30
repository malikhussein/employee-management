import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination';
import useEmployeeStore from '@/store/employee';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import EditEmployeeDialog from './EditEmployeeDialog';
import DeleteEmployeeDialog from './DeleteEmployeeDialog';
import { Skeleton } from '@/components/ui/skeleton';

export default function EmployeeTable({ filters = {} }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { employees, metadata, getAll, loading, error } = useEmployeeStore();

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    const queryParams = {
      page: currentPage,
      ...filters,
    };
    getAll(queryParams);
  }, [getAll, currentPage, filters]);

  // Debug: Log metadata to see its structure
  console.log('Metadata:', metadata);

  // Extract pagination data with fallbacks
  const totalPages = metadata?.totalPages || 1;
  const hasNextPage = metadata?.hasNextPage || currentPage < totalPages;
  const hasPreviousPage = metadata?.hasPreviousPage || currentPage > 1;
  const limit = metadata?.limit || metadata?.perPage || 10;
  const total =
    metadata?.totalItems || metadata?.total || employees?.length || 0;

  // Calculate current showing range
  const startItem = total > 0 ? (currentPage - 1) * limit + 1 : 0;
  const endItem = Math.min(currentPage * limit, total);

  // Page change handlers
  const goToNextPage = () => {
    if (hasNextPage && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers to show
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page area, and last page with ellipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= Math.min(4, totalPages); i++) {
          pages.push(i);
        }
        if (totalPages > 4) {
          pages.push('ellipsis');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        if (totalPages > 4) {
          pages.push('ellipsis');
        }
        for (let i = Math.max(totalPages - 3, 1); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Skeleton loading component
  const TableSkeleton = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden p-5">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Skeleton for pagination */}
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-4 w-48" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );

  if (loading) return <TableSkeleton />;

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-5 border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees && employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    {employee.firstName + ' ' + employee.lastName}
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.salary}</TableCell>
                  <TableCell>{employee.department?.name || 'N/A'}</TableCell>
                  <TableCell>
                    {employee.hireDate
                      ? new Date(employee.hireDate).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <EditEmployeeDialog
                        employee={employee}
                        btn={
                          <Button size="sm">
                            <Pencil />
                          </Button>
                        }
                      />
                      <DeleteEmployeeDialog
                        employee={employee}
                        btn={
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No employees found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination info and controls */}
      {total > 0 && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-gray-700">
            Showing {startItem} to {endItem} of {total} results
          </div>

          <div className="ml-auto">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={goToPreviousPage}
                    className={
                      !hasPreviousPage
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer hover:bg-gray-100'
                    }
                  />
                </PaginationItem>

                {generatePageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => goToPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={goToNextPage}
                    className={
                      !hasNextPage
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer hover:bg-gray-100'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}
