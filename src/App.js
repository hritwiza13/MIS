import React, { useState } from 'react';
import { Routes, Route, Navigate, HashRouter as Router } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/Home';
import Production from './components/departments/Production';
import Quality from './components/departments/Quality';
import Maintenance from './components/departments/Maintenance';
import Packaging from './components/departments/Packaging';
import Coloring from './components/departments/Coloring';
import Reports from './components/Reports';
import ReportUpload from './components/reports/ReportUpload';
import ReportDownload from './components/reports/ReportDownload';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = (data) => {
    setUserInfo({
      department: data.department,
      user: data.user
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Navbar userInfo={userInfo} onLogout={handleLogout} />
        <Sidebar department={userInfo.department} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            pt: 8,
            px: 3
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute allowedDepartments={['production', 'quality', 'maintenance', 'packaging', 'coloring']}>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/production"
                element={
                  <ProtectedRoute department={userInfo.department} allowedDepartments={['production']}>
                    <Production userInfo={userInfo} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quality"
                element={
                  <ProtectedRoute department={userInfo.department} allowedDepartments={['quality']}>
                    <Quality userInfo={userInfo} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/maintenance"
                element={
                  <ProtectedRoute department={userInfo.department} allowedDepartments={['maintenance']}>
                    <Maintenance userInfo={userInfo} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/packaging"
                element={
                  <ProtectedRoute department={userInfo.department} allowedDepartments={['packaging']}>
                    <Packaging userInfo={userInfo} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coloring"
                element={
                  <ProtectedRoute department={userInfo.department} allowedDepartments={['coloring']}>
                    <Coloring userInfo={userInfo} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute allowedDepartments={['production', 'quality', 'maintenance', 'packaging', 'coloring']}>
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/upload"
                element={
                  <ProtectedRoute allowedDepartments={['production', 'quality', 'maintenance', 'packaging', 'coloring']}>
                    <ReportUpload />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/download"
                element={
                  <ProtectedRoute allowedDepartments={['production', 'quality', 'maintenance', 'packaging', 'coloring']}>
                    <ReportDownload />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to={`/${userInfo.department}`} replace />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
