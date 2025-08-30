import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import React from 'react';

export default function CardOverview({ icon, color, title, count }) {
  const IconComponent = icon;

  return (
    <div className="w-full lg:w-1/3 p-2 h-full">
      <Card>
        <div className="flex flex-row items-center px-4 py-3">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full mr-4"
            style={{ backgroundColor: color && `${color}15` }}
          >
            <IconComponent style={{ color: color }} className="h-6 w-6" />
          </div>
          <div className="flex flex-row items-center justify-between flex-1">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="text-xl font-bold">{count}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
