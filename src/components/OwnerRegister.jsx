import React, { useState } from 'react';

const OwnerRegister = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [aadhaarFile, setAadhaarFile] = useState(null);

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Logic to send OTP
    setIsOtpSent(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Logic to handle registration
  };

  const handleAadhaarUpload = (e) => {
    setAadhaarFile(e.target.files[0]);
    // Logic to validate Aadhaar/GSTN through APIs
  };

  return (
    <>
      <h2 className="text-2xl font-bold my-4">Owner Register</h2>
      <form className="w-full" onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input type="text" id="name" name="name" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <input type="text" id="address" name="address" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={handleSendOtp}
            className="mt-2 bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send OTP
          </button>
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
        <div className="mb-4">
          <label htmlFor="aadhaar" className="block text-gray-700 text-sm font-bold mb-2">Aadhaar Card/GSTN Number</label>
          <input
            type="file"
            id="aadhaar"
            name="aadhaar"
            onChange={handleAadhaarUpload}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-primary-dark w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
        </div>
      </form>
    </>
  );
};

export default OwnerRegister;