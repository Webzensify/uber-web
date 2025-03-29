import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const phoneNumberSchema = z.object({
  phoneNumber: z.string().length(10, 'Phone number must be exactly 10 digits'),
});

const registrationSchema = phoneNumberSchema.extend({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  aadhaar: z.string().length(12, 'Aadhaar number must be exactly 12 digits'),
  email: z.string().email('Invalid email address'),
});

const OwnerRegister = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { signup } = useAuth();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isOtpSent ? registrationSchema : phoneNumberSchema),
  });

  const handleSendOtp = async (data) => {
    try {
      await axios.post('/api/auth/send-otp', { mobileNumber: `+91${data.phoneNumber}`, role: 'owner' });
      toast.success('OTP sent successfully');
      setIsOtpSent(true); // Move to the next stepphoneNumber
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to send OTP');
    }
  };

  const handleRegister = async (data) => {
    try {
      const response = await axios.post('/api/auth/register', {
        mobileNumber: `+91${data.phoneNumber}`,
        otp: data.otp,
        name: data.name,
        address: data.address,
        aadhaarNumber: data.aadhaar,
        email: data.email,
        role: 'owner',
      });
      const { entity, token } = response.data;

      // Use AuthProvider's signup method
      signup(entity, token);

      toast.success('Registration successful');
      reset();
      setIsOtpSent(false); // Reset the form state
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to register');
    }
  };

  const onSubmit = (data) => {
    if (!isOtpSent) {
      handleSendOtp(data);
    } else {
      handleRegister(data);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold my-4">Owner Register</h2>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
          <input
            type="tel"
            id="phoneNumber"
            {...register('phoneNumber')}
            required
            readOnly={isOtpSent} // Make the phone number read-only after OTP is sent
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              isOtpSent ? 'bg-gray-100' : ''
            }`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber.message}</p>}
        </div>
        {isOtpSent && (
          <>
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
          </>
        )}
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