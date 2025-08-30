import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  LogOut,
  ShieldUser,
  Key,
} from 'lucide-react';
import useAuthStore from '@/store/auth';
import { Button } from '../ui/button';
import ChangePasswordDialog from '@/pages/Auth/ChangePasswordDialog';

export default function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuthStore();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Employees',
      href: '/employees',
      icon: Users,
    },
    {
      name: 'Departments',
      href: '/departments',
      icon: Building2,
    },
    {
      name: 'Users',
      href: '/users',
      icon: ShieldUser,
    },
  ];
  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <div className="hidden md:flex md:w-80 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-primary">
          <h1 className="text-xl font-bold text-primary-foreground text-center w-full">
            Employee System
          </h1>
        </div>
        <div className="flex-1 flex flex-col mt-6 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 mx-6 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text- hover:bg-gray-100 hover:text-primary'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive(item.href)
                      ? 'text-primary-foreground'
                      : 'text-gray-500 group-hover:text-primary'
                  } mr-6 flex-shrink-0 h-6 w-6`}
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="px-2 py-4 mx-6 border-t border-gray-200 space-y-2">
            <Button
              variant="outline"
              onClick={() => setIsChangePasswordOpen(true)}
              className="w-full px-2 py-2 text-sm font-medium rounded-md"
            >
              <Key className="mr-3 h-6 w-6" />
              Change Password
            </Button>
            <Button
              variant="destructive"
              onClick={signOut}
              className="w-full px-2 py-2 text-sm font-medium rounded-md"
            >
              <LogOut className="mr-3 h-6 w-6" />
              Sign out
            </Button>
          </div>
        </div>

        <ChangePasswordDialog
          open={isChangePasswordOpen}
          onClose={() => setIsChangePasswordOpen(false)}
        />
      </div>
    </div>
  );
}
