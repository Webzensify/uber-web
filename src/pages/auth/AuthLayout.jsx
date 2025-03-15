import React from 'react'
import { useState } from 'react';
import AdminLogin from './AdminLogin';
import OwnerAuth from './OwnerAuth';

const AuthLayout = () => {
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
    <div className="flex h-screen">
      <div className="hidden md:flex w-2/3 items-center justify-center bg-primary">
        <img src="/images/logo.png" alt="Login" className="max-w-full h-auto" />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center justify-start bg-white py-15 px-6">
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
        {isAdminSelected && <AdminLogin/>}
        {isOwnerSelected && <OwnerAuth />}
      </div>
    </div>
  )
}

export default AuthLayout
