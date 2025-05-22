import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function ProtectedRoute({ children, allowedDepartments = [] }) {
  const { isAuthenticated, userInfo } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute: Checking route for path:', location.pathname, 'isAuthenticated:', isAuthenticated, 'userInfo:', userInfo);

  // If not authenticated, redirect to welcome page
  if (!isAuthenticated) {
    console.log('ProtectedRoute: Not authenticated, redirecting to /.');
    return <Navigate to="/" replace />;
  }

  // Admin has access to everything
  if (userInfo?.user?.isAdmin) {
    console.log('ProtectedRoute: User is admin, granting access.');
    return children;
  }

  // For non-admin users, check department access
  if (allowedDepartments.length > 0 && !allowedDepartments.includes(userInfo?.department)) {
    console.log('ProtectedRoute: User department', userInfo?.department, 'not in allowed departments:', allowedDepartments, 'redirecting to /unauthorized.');
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('ProtectedRoute: User authenticated and authorized, granting access.');
  return children;
}

export default ProtectedRoute; 