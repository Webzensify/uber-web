import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [token,setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserType = localStorage.getItem('userType');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedUserType && storedToken) {
      setUser(JSON.parse(storedUser));
      setUserType(storedUserType);
      setToken(storedToken);
      
      if (storedUserType === 'owner') {
        navigate('/ownerDashboard');
      } else {
        navigate('/adminDashboard');
      }
    }
  }, [navigate]);

  const login = (userData, role, token) => {
    if (role === 'owner' || role === 'admin'|| role == 'operational admin') {
      setUser(userData);
      setUserType(role);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userType', role);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      // Navigate to the appropriate dashboard
      if (role === 'owner') {
        navigate('/ownerDashboard');
      } else if(role === 'admin'|| role == 'operational admin') {
        navigate('/adminDashboard');
      }
    } else {
      toast.error('Invalid user type for login');
    }
  };

  const signup = (userData, token) => {
    setUser(userData);
    setUserType('owner');
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userType', 'owner');
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    navigate('/ownerDashboard');
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};