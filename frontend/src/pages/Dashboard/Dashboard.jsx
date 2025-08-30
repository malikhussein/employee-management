import React, { useEffect } from 'react';
import CardOverview from './components/CardOverview';
import { Building2, UserPlus, Users } from 'lucide-react';
import DepartmentDistribution from './components/DepartmentDistribution';
import RecentHiresTable from './components/RecentHiresTable';
import useDashboardStore from '@/store/dashboard';

export default function Dashboard() {
  const {
    statistics,
    departmentDistribution,
    recentHires,
    loading,
    getStatistics,
    getDepartmentDistribution,
    getRecentHires,
  } = useDashboardStore();

  useEffect(() => {
    getStatistics();
    getDepartmentDistribution();
    getRecentHires();
  }, [getStatistics, getDepartmentDistribution, getRecentHires]);

  if (loading || !statistics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-10">Dashboard</h1>
      <div className="flex flex-row gap- flex-wrap">
        <CardOverview
          icon={Users}
          color="#3b82f6"
          title="Employees"
          count={statistics.totalEmployees}
        />
        <CardOverview
          icon={Building2}
          color="#22c55e"
          title="Departments"
          count={statistics.totalDepartments}
        />
        <CardOverview
          icon={UserPlus}
          color="#a855f7"
          title="Recent Hires"
          count={statistics.recentHires}
        />
      </div>
      <DepartmentDistribution
        departments={departmentDistribution}
        totalEmployees={statistics.totalEmployees}
      />
      <RecentHiresTable recentHires={recentHires} />
    </div>
  );
}
