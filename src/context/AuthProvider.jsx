import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserType = localStorage.getItem('userType');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedUserType && storedToken) {
      setUser(JSON.parse(storedUser));
      setUserType(storedUserType);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      window.location.href = '/dashboard';
    }
  }, []);

  const login = (userData, role, token) => {
    if (role === 'owner' || role === 'admin') {
      setUser(userData);
      setUserType(role);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userType', role);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('Invalid user type for login');
    }
  };

  const signup = (userData, token) => {
    setUser(userData);
    setUserType('owner');
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userType', 'owner');
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};