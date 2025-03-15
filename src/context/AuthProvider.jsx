import React, {useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  const login = (userData, role) => {
    if (role === 'owner' || role === 'admin') {
      setUser(userData);
      setUserType(role);
    } else {
      console.error('Invalid user type for login');
    }
  };

  const signup = (userData) => {
    setUser(userData);
    setUserType('owner'); 
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
