import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthLayout from "./pages/auth/AuthLayout"
import Dashboard from './pages/dashboard/Dashboard';
import { AuthProvider } from './context/AuthProvider.jsx';
const App = () => {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;