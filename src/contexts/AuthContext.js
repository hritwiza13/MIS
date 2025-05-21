import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Check localStorage for existing session on mount
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedAuth && storedUserInfo) {
      setIsAuthenticated(true);
      setUserInfo(storedUserInfo);
    }
  }, []);

  const login = (data) => {
    // Assuming successful login data is passed
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userDepartment', data.department);
    localStorage.setItem('isAdmin', data.department === 'admin' ? 'true' : 'false');
    localStorage.setItem('userInfo', JSON.stringify(data));
    setIsAuthenticated(true);
    setUserInfo(data);
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userDepartment');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userInfo');
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 