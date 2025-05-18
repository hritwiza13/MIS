import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedDepartments }) {
  const userDepartment = localStorage.getItem('userDepartment');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedDepartments.includes(userDepartment)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute; 