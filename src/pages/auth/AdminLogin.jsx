import React, { useState } from 'react';

const AdminLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Logic to send OTP
    setIsOtpSent(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic to verify OTP and login
  };

  return (
    <>
      <h2 className="text-2xl text-left font-bold my-6">Admin Login</h2>
      <form className="w-full">
        <div className="my-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">OTP</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            disabled={!isOtpSent}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isOtpSent ? 'bg-gray-200' : ''}`}
          />
        </div>
        <div className="flex items-center justify-between">
          {!isOtpSent ? (
            <button
              onClick={handleSendOtp}
              className="bg-primary-dark w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send OTP
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-primary-dark w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default AdminLogin;