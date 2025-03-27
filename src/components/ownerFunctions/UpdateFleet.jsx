import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const fleetSchema = z.object({
  _id: z.string().optional(), // For editing existing vehicles
  model: z.string().min(1, 'Model is required'),
  brand: z.string().min(1, 'Brand is required'),
  type: z.string().min(1, 'Type is required'),
  seats: z.number().min(1, 'Seats must be at least 1'),
  number: z.string().min(1, 'Number is required'),
  year: z.number().min(1900, 'Year must be valid'),
  desc: z.string().min(1, 'Description is required'),
});

const UpdateFleet = () => {
  const [fleets, setFleets] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(fleetSchema),
  });

  // Fetch fleet data from the backend
  const fetchFleets = async () => {
    try {
      const response = await axios.get('/api/owner/getCars', {
        headers: {
          authtoken: localStorage.getItem('token'),
          role: localStorage.getItem('userType'),
        },
      });
      setFleets(response.data.cars);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to fetch fleet data');
    }
  };

  // Add or update a vehicle in the fleet
  const onSubmit = async (data) => {
    try {
      if (data._id) {
        // Update vehicle
        const response = await axios.put(`/api/owner/editCar/${data._id}`, data, {
          headers: {
            authtoken: localStorage.getItem('token'),
            role: localStorage.getItem('userType'),
          },
        });
        toast.success('Vehicle updated successfully');
        setFleets(fleets.map((fleet) => (fleet._id === data._id ? response.data.car : fleet)));
      } else {
        // Add new vehicle
        const response = await axios.post('/api/owner/addCar', data, {
          headers: {
            authtoken: localStorage.getItem('token'),
            role: localStorage.getItem('userType'),
          },
        });
        toast.success('Vehicle added successfully');
        setFleets([...fleets, response.data.car]);
      }
      reset(); // Reset the form
      setIsEditing(false); // Reset editing state
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to save vehicle');
    }
  };

  // Delete a vehicle from the fleet
  const handleDelete = async (id) => {
    try {
      await axios.get(`/api/owner/deleteCar/${id}`, {
        headers: {
          authtoken: localStorage.getItem('token'),
          role: localStorage.getItem('userType'),
        },
      });
      toast.success('Vehicle deleted successfully');
      setFleets(fleets.filter((fleet) => fleet._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to delete vehicle');
    }
  };

  // Populate form for editing
  const handleEdit = (fleet) => {
    reset(fleet); // Populate the form with the selected fleet data
    setIsEditing(true); // Set editing state
  };

  useEffect(() => {
    fetchFleets();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Update Fleet</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register('_id')} />
        <div>
          <label htmlFor="model" className="block text-gray-700 font-bold">Model</label>
          <select id="model" {...register('model')} className="w-full p-2 border rounded">
            <option value="">Select Model</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
          </select>
          {errors.model && <p className="text-red-500 text-xs italic">{errors.model.message}</p>}
        </div>
        <div>
          <label htmlFor="brand" className="block text-gray-700 font-bold">Brand</label>
          <select id="brand" {...register('brand')} className="w-full p-2 border rounded">
            <option value="">Select Brand</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
          </select>
          {errors.brand && <p className="text-red-500 text-xs italic">{errors.brand.message}</p>}
        </div>
        <div>
          <label htmlFor="type" className="block text-gray-700 font-bold">Type</label>
          <select id="type" {...register('type')} className="w-full p-2 border rounded">
            <option value="">Select Type</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs italic">{errors.type.message}</p>}
        </div>
        <div>
          <label htmlFor="seats" className="block text-gray-700 font-bold">Seats</label>
          <select id="seats" {...register('seats', { valueAsNumber: true })} className="w-full p-2 border rounded">
            <option value="">Select Seats</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
          {errors.seats && <p className="text-red-500 text-xs italic">{errors.seats.message}</p>}
        </div>
        <div>
          <label htmlFor="number" className="block text-gray-700 font-bold">Number</label>
          <input
            type="text"
            id="number"
            {...register('number')}
            className="w-full p-2 border rounded"
          />
          {errors.number && <p className="text-red-500 text-xs italic">{errors.number.message}</p>}
        </div>
        <div>
          <label htmlFor="year" className="block text-gray-700 font-bold">Year</label>
          <select id="year" {...register('year', { valueAsNumber: true })} className="w-full p-2 border rounded">
            <option value="">Select Year</option>
            {Array.from({ length: 30 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
          {errors.year && <p className="text-red-500 text-xs italic">{errors.year.message}</p>}
        </div>
        <div>
          <label htmlFor="desc" className="block text-gray-700 font-bold">Description</label>
          <textarea
            id="desc"
            {...register('desc')}
            className="w-full p-2 border rounded"
          />
          {errors.desc && <p className="text-red-500 text-xs italic">{errors.desc.message}</p>}
        </div>
        <button type="submit" className="bg-primary-dark text-white py-2 px-5 rounded">
          {isEditing ? 'Edit' : 'Submit'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Fleet List</h2>
      <div className="space-y-4">
        {fleets.map((fleet) => (
          <div key={fleet._id} className="p-4 border rounded shadow-sm flex justify-between">
            <div>
              <p><strong>Model:</strong> {fleet.model}</p>
              <p><strong>Brand:</strong> {fleet.brand}</p>
              <p><strong>Type:</strong> {fleet.type}</p>
              <p><strong>Seats:</strong> {fleet.seats}</p>
              <p><strong>Number:</strong> {fleet.number}</p>
              <p><strong>Year:</strong> {fleet.year}</p>
              <p><strong>Description:</strong> {fleet.desc}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(fleet)}
                className="bg-blue-500 text-white py-1 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(fleet._id)}
                className="bg-red-500 text-white py-1 px-3 rounded"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateFleet;