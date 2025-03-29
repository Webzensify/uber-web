import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define Zod schema for validation
const operationalAdminSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z
    .string()
    .regex(/^\d{10}$/, 'Mobile number must be 10 digits'),
});

const ManageOpAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(operationalAdminSchema),
  });

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/admin/appointOperationalAdmin', {
        name: data.name,
        email: data.email,
        mobileNumber: `+91${data.mobileNumber}`,
        role: 'admin',
      }, {
        headers: {
          authtoken: localStorage.getItem('token'),
          role: localStorage.getItem('userType'),
        },
      });
      toast.success(response.data.msg || 'Operational Admin created successfully');
      reset(); // Reset the form after successful submission
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to create Operational Admin');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Appoint Operational Admin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full p-2 border rounded"
            placeholder="Enter name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full p-2 border rounded"
            placeholder="Enter email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Mobile Number Field */}
        <div>
          <label className="block font-medium mb-1">Mobile Number</label>
          <input
            type="text"
            {...register('mobileNumber')}
            className="w-full p-2 border rounded"
            placeholder="Enter mobile number"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary-dark text-white py-2 px-4 rounded"
        >
          Create Admin
        </button>
      </form>
    </div>
  );
};

export default ManageOpAdmin;