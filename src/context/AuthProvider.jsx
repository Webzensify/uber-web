import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    try{
      const storedUser = localStorage.getItem('user');
      const storedUserType = localStorage.getItem('userType');
      const storedToken = localStorage.getItem('token');
  
      if (storedUser && storedUserType && storedToken) {
        setUser(JSON.parse(storedUser));
        setUserType(storedUserType);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        window.location.href = '/dashboard';
      }  
    }
    catch(err){
      console.log(err)
    }
    
  }, []);

  const login = async (userData) => {
    try {
      const response = await axios.post('/api/owner/login', userData);
      if (response.data.success) {
        setUser(response.data.user);
        setUserType(response.data.role);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userType', response.data.role);
        localStorage.setItem('token', response.data.authToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      } else {
        console.error('Invalid user type for login');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post('/api/owner/register', userData);
      if (response.data.success) {
        setUser(response.data.user);
        setUserType('owner');
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userType', 'owner');
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('/api/owner/logout');
      if (response.data.success) {
        setUser(null);
        setUserType(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const addDriver = async (driverData) => {
    try {
      const response = await fetch('http://localhost:3000/api/owner/addDriver', driverData);
      if (response.data.success) {
        console.log('Driver added successfully');
      } else {
        console.error('Add driver failed');
      }
    } catch (error) {
      console.error('Add driver failed', error);
    }
  };

  const addFleet = async (fleetData) => {
    try {
      console.log(`fleet: ${fleetData}`)
      const response = await fetch('http://localhost:3000/api/owner/addCar', fleetData)
      const result = await response.json()
      if (result) {
        console.log('Fleet added successfully');
      } else {
        console.error('Add fleet failed');
      }
    } catch (error) {
      console.error('Add fleet failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, signup, logout, addDriver, addFleet }}>
      {children}
    </AuthContext.Provider>
  );
};