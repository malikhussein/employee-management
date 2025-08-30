import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/auth';

// Component to protect routes that require authentication
export function ProtectedRoute({ children }) {
  const { token, user, getMe, loading } = useAuthStore();
  const [isValidating, setIsValidating] = useState(!!token);

  useEffect(() => {
    const validateToken = async () => {
      if (token && !user) {
        try {
          await getMe();
        } catch (error) {
          console.error('Token validation failed:', error);
          // Token is invalid, will redirect to login
        } finally {
          setIsValidating(false);
        }
      } else {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token, user, getMe]);

  // Show loading state while validating token
  if (isValidating || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no token or token is invalid, redirect to login
  if (!token || (!user && !loading)) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the protected content
  return children;
}

// Component to redirect authenticated users away from auth pages
export function PublicRoute({ children }) {
  const { token, user } = useAuthStore();

  // If user is authenticated, redirect to dashboard
  if (token && user) {
    return <Navigate to="/" replace />;
  }

  // User is not authenticated, render the public content (login/signup)
  return children;
}

// Default export for the main ProtectedRoute
export default ProtectedRoute;
