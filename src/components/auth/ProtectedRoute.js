import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, allowedDepartments = [] }) {
  const { isAuthenticated, userInfo } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Admin has access to everything
  if (userInfo && userInfo.user && userInfo.user.isAdmin) {
    return children;
  }

  // For non-admin users, check department access
  if (allowedDepartments.length > 0 && userInfo && userInfo.department && !allowedDepartments.includes(userInfo.department)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute; 