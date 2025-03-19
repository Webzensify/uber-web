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
  aadhaarNumber: z.string().min(1, 'Aadhaar Number is required'),
  licenseNumber: z.string().min(1, 'License Number is required'),
});

const CreateDriver = ({ addDriver }) => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({
    resolver: zodResolver(isOtpSent ? otpSchema : schema),
  });

  const handleSendOtp = async (data) => {
    // Call addDriver function to send OTP
    await addDriver(data);
    console.log(`form- ${data}`)
    setIsOtpSent(true);
  };

  const handleRegister = async (data) => {
    // Logic to handle registration
    await addDriver(data);
    reset();
    setIsOtpSent(false);
  };

  return (
    <div className='px-6 py-4'>
      <h2 className="text-2xl font-bold my-4">Create Driver</h2>
      <form className="w-full" onSubmit={handleSubmit(isOtpSent ? handleRegister : handleSendOtp)}>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
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
          <div className="w-full md:w-1/2 px-3">
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
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
            <input
              type="tel"
              id="phoneNumber"
              {...register('phoneNumber')}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber.message}</p>}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label htmlFor="aadhaarNumber" className="block text-gray-700 text-sm font-bold mb-2">Aadhaar Number</label>
            <input
              type="text"
              id="aadhaarNumber"
              {...register('aadhaarNumber')}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.aadhaarNumber && <p className="text-red-500 text-xs italic">{errors.aadhaarNumber.message}</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="licenseNumber" className="block text-gray-700 text-sm font-bold mb-2">License Number</label>
            <input
              type="text"
              id="licenseNumber"
              {...register('licenseNumber')}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.licenseNumber && <p className="text-red-500 text-xs italic">{errors.licenseNumber.message}</p>}
          </div>
        </div>
        {isOtpSent && (
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3">
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
          </div>
        )}
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-primary-dark w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {isOtpSent ? 'Register' : 'Send OTP'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDriver;