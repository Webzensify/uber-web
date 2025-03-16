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

const schema = otpSchema.extend({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  aadhaar: z.string().min(12, 'Aadhaar number must be exactly 12 digits').max(12, 'Aadhaar number must be exactly 12 digits'),
  gstin: z.string().min(15, 'GSTIN must be exactly 15 characters').max(15, 'GSTIN must be exactly 15 characters'),
  email: z.string().email('Invalid email address'),
});

const OwnerRegister = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isOtpSent ? schema : phoneNumberSchema),
  });

  const handleSendOtp = (data) => {
    // Logic to send OTP
    setIsOtpSent(true);
    reset({ phoneNumber: data.phoneNumber });
  };
  const handleRegister = (data) => {
    // Logic to handle registration
    
  }

  return (
    <>
      <h2 className="text-2xl font-bold my-4">Owner Register</h2>
      <form className="w-full" onSubmit={handleSubmit(isOtpSent ? handleRegister : handleSendOtp)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            {...register('name')}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <input
            type="text"
            id="address"
            {...register('address')}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.address && <p className="text-red-500 text-xs italic">{errors.address.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
          <input
            type="tel"
            id="phoneNumber"
            {...register('phoneNumber')}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber.message}</p>}
          <button
            type="button"
            onClick={handleSubmit(handleSendOtp)}
            className="mt-2 bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send OTP
          </button>
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
        <div className="mb-4">
          <label htmlFor="aadhaar" className="block text-gray-700 text-sm font-bold mb-2">Aadhaar Number</label>
          <input
            type="text"
            id="aadhaar"
            {...register('aadhaar')}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.aadhaar && <p className="text-red-500 text-xs italic">{errors.aadhaar.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="gstin" className="block text-gray-700 text-sm font-bold mb-2">GSTIN</label>
          <input
            type="text"
            id="gstin"
            {...register('gstin')}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.gstin && <p className="text-red-500 text-xs italic">{errors.gstin.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-primary-dark w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {isOtpSent ? 'Register' : 'Send OTP'}
          </button>
        </div>
      </form>
    </>
  );
};

export default OwnerRegister;