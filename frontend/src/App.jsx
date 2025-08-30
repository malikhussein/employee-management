import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import Departments from './pages/Departments/Departments';
import Users from './pages/Users/Users';
import {
  ProtectedRoute,
  PublicRoute,
} from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route for authentication */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Layout>
                <Employees />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <Layout>
                <Departments />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <Users />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fallback route - redirect to auth if not authenticated, dashboard if authenticated */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
