import React from 'react';
import CardOverview from './components/CardOverview';
import { Building2, UserPlus, Users } from 'lucide-react';
import DepartmentDistribution from './components/DepartmentDistribution';
import RecentHiresTable from './components/RecentHiresTable';

const totalEmployees = 248;
const departments = [
  {
    name: 'Engineering',
    count: 85,
  },
  {
    name: 'Marketing',
    count: 32,
  },
  {
    name: 'Sales',
    count: 54,
  },
  {
    name: 'HR',
    count: 15,
  },
  {
    name: 'Finance',
    count: 22,
  },
  {
    name: 'Operations',
    count: 40,
  },
];

const recentHires = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Frontend Developer',
    department: 'Engineering',
    date: '2023-08-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Marketing Specialist',
    department: 'Marketing',
    date: '2023-08-12',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    position: 'Sales Manager',
    department: 'Sales',
    date: '2023-08-10',
  },
  {
    id: 4,
    name: 'Emily Davis',
    position: 'HR Assistant',
    department: 'HR',
    date: '2023-08-05',
  },
  {
    id: 5,
    name: 'Michael Wilson',
    position: 'Financial Analyst',
    department: 'Finance',
    date: '2023-08-01',
  },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-10">Dashboard</h1>
      <div className="flex flex-row gap- flex-wrap">
        <CardOverview
          icon={Users}
          color="#3b82f6"
          title="Employees"
          count={100}
        />
        <CardOverview
          icon={Building2}
          color="#22c55e"
          title="Departments"
          count={10}
        />
        <CardOverview
          icon={UserPlus}
          color="#a855f7"
          title="Recent Hires"
          count={6}
        />
      </div>
      <DepartmentDistribution
        departments={departments}
        totalEmployees={totalEmployees}
      />
      <RecentHiresTable recentHires={recentHires} />
    </div>
  );
}
