import React, { useState } from 'react';
import AuthLayout from './pages/auth/AuthLayout';
import AdminLogin from './pages/auth/AdminLogin';
import OwnerAuth from './pages/auth/OwnerAuth';

const App = () => {
  const [isAdminSelected, setIsAdminSelected] = useState(false);
  const [isOwnerSelected, setIsOwnerSelected] = useState(true);

  const handleAdminClick = () => {
    setIsAdminSelected(true);
    setIsOwnerSelected(false);
  };

  const handleOwnerClick = () => {
    setIsOwnerSelected(true);
    setIsAdminSelected(false);
  };

  return (
    <AuthLayout>
      <div className="flex space-x-4 w-full">
        <button
          className={`flex-1 bg-primary-dark text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline ${isAdminSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleAdminClick}
          disabled={isAdminSelected}
        >
          Admin
        </button>
        <button
          className={`flex-1 bg-primary-dark text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline  ${isOwnerSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleOwnerClick}
          disabled={isOwnerSelected}
        >
          Owner
        </button>
      </div>
      {isAdminSelected && <AdminLogin />}
      {isOwnerSelected && <OwnerAuth />}
    </AuthLayout>
  );
};

export default App;