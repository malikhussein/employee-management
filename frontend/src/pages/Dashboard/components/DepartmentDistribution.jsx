import { Card } from '@/components/ui/card';
import React from 'react';

export default function DepartmentDistribution({
  departments,
  totalEmployees,
}) {
  return (
    <Card className="p-6 my-8">
      <h2 className="text-lg font-medium mb-4">Department Distribution</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {departments.map((dept) => (
          <div key={dept.name} className="bg-primary-foreground p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">{dept.name}</p>
            <p className="text-xl font-semibold">{dept.count}</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{
                  width: `${(dept.count / totalEmployees) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
