import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthLayout from "./pages/auth/AuthLayout"
import { AuthProvider } from './context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import OwnerDashboard from './pages/dashboard/OwnerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer/>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/ownerDashboard" element={<OwnerDashboard />}/>
        <Route path="/adminDashboard" element={<AdminDashboard/>} />
        <Route path="*" element={<h1>Not Found</h1>} />

      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;