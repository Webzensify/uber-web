import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthLayout from "./pages/auth/AuthLayout"
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;