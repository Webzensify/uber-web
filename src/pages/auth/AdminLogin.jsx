import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const phoneNumberSchema = z.object({
  phoneNumber: z.string().length(10, 'Phone number must be exactly 10 digits'),
});

const otpSchema = phoneNumberSchema.extend({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
});

const AdminLogin = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isOtpSent ? otpSchema : phoneNumberSchema),
  });

  const handleSendOtp = (data) => {
    // Logic to send OTP
    setIsOtpSent(true);
    reset({ phoneNumber: data.phoneNumber });
  };

  const handleLogin = (data) => {
    // Logic to verify OTP and login
  };

  return (
    <>
      <h2 className="text-2xl text-left font-bold my-6">Admin Login</h2>
      <form className="w-full" onSubmit={handleSubmit(isOtpSent ? handleLogin : handleSendOtp)}>
        <div className="my-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            {...register('phoneNumber')}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber.message}</p>}
        </div>
        {isOtpSent && (
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">OTP</label>
            <input
              type="text"
              id="otp"
              {...register('otp')}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.otp && <p className="text-red-500 text-xs italic">{errors.otp.message}</p>}
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-primary-dark w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isOtpSent ? 'Login' : 'Send OTP'}
          </button>
        </div>
      </form>
    </>
  );
};

export default AdminLogin;