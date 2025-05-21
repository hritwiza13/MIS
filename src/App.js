import React, { useState } from 'react';
import { Routes, Route, Navigate, HashRouter as Router, useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Login from './components/auth/Login';
import Welcome from './components/Welcome';
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
import AdminDashboard from './components/admin/AdminDashboard';
import RawMaterial from './components/production/RawMaterial';
import Billets from './components/production/Billets';
import Direct from './components/production/Direct';
import ButtEnd from './components/production/ButtEnd';
import Material from './components/production/Material';
import FinishCut from './components/production/FinishCut';
import WIP from './components/production/WIP';
import PowerCoating from './components/finishing/PowerCoating';
import Anodizing from './components/finishing/Anodizing';
import MetalFinishing from './components/finishing/MetalFinishing';
import Dispatch from './components/inventory/Dispatch';
import ScrapReports from './components/reports/ScrapReports';
import ReturnsReports from './components/reports/ReturnsReports';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Create a wrapper component to use useNavigate
function AppContent() {
  const { isAuthenticated, userInfo, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Welcome page route */}
      <Route path="/" element={<Welcome />} />
      
      {/* Route for the Login page */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes - only accessible when authenticated */}
      <Route
        path="/*"
        element={
          isAuthenticated && userInfo ? (
            <Box sx={{ display: 'flex' }}>
              <Navbar />
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
                    {/* Admin Dashboard Route */}
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute allowedDepartments={['admin']}>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    {/* Department Routes */}
                    <Route path="/production" element={<ProtectedRoute department={userInfo.department} allowedDepartments={['production']}><Production userInfo={userInfo} /></ProtectedRoute>} />
                    <Route path="/quality" element={<ProtectedRoute department={userInfo.department} allowedDepartments={['quality']}><Quality userInfo={userInfo} /></ProtectedRoute>} />
                    <Route path="/maintenance" element={<ProtectedRoute department={userInfo.department} allowedDepartments={['maintenance']}><Maintenance userInfo={userInfo} /></ProtectedRoute>} />
                    <Route path="/packaging" element={<ProtectedRoute department={userInfo.department} allowedDepartments={['packaging']}><Packaging userInfo={userInfo} /></ProtectedRoute>} />
                    <Route path="/coloring" element={<ProtectedRoute department={userInfo.department} allowedDepartments={['coloring']}><Coloring userInfo={userInfo} /></ProtectedRoute>} />
                    
                    {/* New Production Process Routes */}
                    <Route path="/production/raw-material" element={<ProtectedRoute allowedDepartments={['production', 'admin']}><RawMaterial /></ProtectedRoute>} />
                    <Route path="/production/billets" element={<ProtectedRoute allowedDepartments={['production', 'admin']}><Billets /></ProtectedRoute>} />
                    <Route path="/production/direct" element={<ProtectedRoute allowedDepartments={['production', 'admin']}><Direct /></ProtectedRoute>} />
                    <Route path="/production/butt-end" element={<ProtectedRoute allowedDepartments={['production', 'admin']}><ButtEnd /></ProtectedRoute>} />
                    <Route path="/production/material" element={<ProtectedRoute allowedDepartments={['production', 'admin']}><Material /></ProtectedRoute>} />
                    <Route path="/production/finish-cut" element={<ProtectedRoute allowedDepartments={['production', 'admin']}><FinishCut /></ProtectedRoute>} />
                    <Route path="/production/wip" element={<ProtectedRoute allowedDepartments={['production', 'admin']}><WIP /></ProtectedRoute>} />

                    {/* New Finishing Routes */}
                    <Route path="/finishing/power-coating" element={<ProtectedRoute allowedDepartments={['coloring', 'admin']}><PowerCoating /></ProtectedRoute>} />
                    <Route path="/finishing/anodizing" element={<ProtectedRoute allowedDepartments={['coloring', 'admin']}><Anodizing /></ProtectedRoute>} />
                    <Route path="/finishing/metal-finishing" element={<ProtectedRoute allowedDepartments={['coloring', 'admin']}><MetalFinishing /></ProtectedRoute>} />

                    {/* New Inventory Route */}
                     <Route path="/inventory/dispatch" element={<ProtectedRoute allowedDepartments={['packaging', 'admin']}><Dispatch /></ProtectedRoute>} />

                    {/* Reports Routes */}
                    <Route path="/reports" element={<ProtectedRoute allowedDepartments={['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']}><Reports /></ProtectedRoute>} />
                    <Route path="/reports/upload" element={<ProtectedRoute allowedDepartments={['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']}><ReportUpload /></ProtectedRoute>} />
                    <Route path="/reports/download" element={<ProtectedRoute allowedDepartments={['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']}><ReportDownload /></ProtectedRoute>} />
                    
                    {/* New Report Routes */}
                    <Route path="/reports/scrap" element={<ProtectedRoute allowedDepartments={['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']}><ScrapReports /></ProtectedRoute>} />
                     <Route path="/reports/returns" element={<ProtectedRoute allowedDepartments={['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']}><ReturnsReports /></ProtectedRoute>} />

                    {/* Redirect any unknown authenticated route to the appropriate dashboard */}
                    <Route path="*" element={
                      userInfo.department === 'admin' ? 
                        <Navigate to="/admin" /> : 
                        <Navigate to={`/${userInfo.department}`} />
                    } />
                  </Routes>
                </Container>
              </Box>
            </Box>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Fallback route for any path that doesn't match */}      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
