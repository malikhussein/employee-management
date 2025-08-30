import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import React from 'react';

export default function RecentHiresTable({ recentHires }) {
  return (
    <div className="bg-card border rounded-lg shadow overflow-hidden p-5">
      <div className="py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium">Recent Hires</h2>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentHires.map((hire) => (
              <TableRow key={hire.id}>
                <TableCell>{hire.name}</TableCell>
                <TableCell>{hire.position}</TableCell>
                <TableCell>{hire.department}</TableCell>
                <TableCell>{hire.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
