import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('AuthContext: Initializing. isAuthenticated:', isAuthenticated, 'userInfo:', userInfo, 'isLoading:', isLoading);

  useEffect(() => {
    console.log('AuthContext useEffect: Running.');
    // Check localStorage on initial load
    const checkAuth = () => {
      console.log('AuthContext checkAuth: Checking localStorage.');
      try {
        const storedAuth = localStorage.getItem('isAuthenticated');
        const storedUser = localStorage.getItem('userInfo');
        
        console.log('AuthContext checkAuth: storedAuth:', storedAuth, 'storedUser:', storedUser);

        if (storedAuth === 'true' && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log('AuthContext checkAuth: Found authenticated user in localStorage:', parsedUser);
          setIsAuthenticated(true);
          setUserInfo(parsedUser);
        } else {
          console.log('AuthContext checkAuth: No authenticated user found in localStorage or data is invalid.');
          // Clear any invalid data
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userInfo');
          setIsAuthenticated(false);
          setUserInfo(null);
        }
      } catch (error) {
        console.error('AuthContext checkAuth: Error checking authentication:', error);
        // Clear invalid data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userInfo');
        setIsAuthenticated(false);
        setUserInfo(null);
      } finally {
        console.log('AuthContext checkAuth: Finished check. Setting isLoading to false.');
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (userData) => {
    console.log('AuthContext login: Attempting login with userData:', userData);
    try {
      // Validate user data
      if (!userData || !userData.department || !userData.user) {
        throw new Error('Invalid user data');
      }

      // Simulate API call delay (optional, remove if using real API)
      // await new Promise(resolve => setTimeout(resolve, 1000));

      // Structure the user info consistently
      const userInfo = {
        department: userData.department,
        user: {
          id: userData.user.id,
          username: userData.user.username,
          name: userData.user.name,
          isAdmin: userData.user.isAdmin || userData.department === 'admin'
        }
      };

      // Update state and storage
      setIsAuthenticated(true);
      setUserInfo(userInfo);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      console.log('AuthContext login: Login successful. userInfo:', userInfo);

      return userInfo;
    } catch (error) {
      console.error('AuthContext login: Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('AuthContext logout: Logging out.');
    setIsAuthenticated(false);
    setUserInfo(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userInfo');
    console.log('AuthContext logout: State updated.');
  };

  if (isLoading) {
    console.log('AuthContext: Still loading, returning null.');
    return null; // or a loading spinner
  }

  console.log('AuthContext: Finished loading, providing context.');
  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 