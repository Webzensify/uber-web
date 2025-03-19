import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

const fleetSchema = z.object({
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  vehicleModel: z.string().min(1, 'Vehicle model is required'),
  vehicleCapacity: z.number().min(1, 'Vehicle capacity must be at least 1'),
  vehicleNoPlate: z.string().min(1, 'Vehicle number plate is required'),
  vehicleDescription: z.string().min(1, 'Vehicle description is required'),
});

const UpdateFleet = ({ addFleet }) => {
  const [fleetData, setFleetData] = useState({
    model: '',
    brand: '',
    type: '',
    seats: '',
    number: '',
    year: '',
    desc: ''
  });
  const [cars, setCars] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(fleetSchema),
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        console.log("fetching")
        const response = await fetch('http://localhost:3000/api/owner/getCars',{
          method: "GET",
          headers: {
          "content-Type": "application/json",
          "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkNmNkNWM3Y2YzNzMwOTU3YTk4YjlkIn0sImlhdCI6MTc0MjEzMDUzN30.MAwC41HC21HpJEQbrG8BNCSBgyTw4zHIXJ494aIyCl0",
          "role": "owner"
        }}
        );
        const result = await response.json()
        setCars(result.cars);
      } catch (error) {
        console.error('Failed to fetch cars', error);
      }
    };

    fetchCars();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFleetData({ ...fleetData, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const requestData = {
      method: "POST",
      body: JSON.stringify(fleetData),
      headers: {
        "content-Type": "application/json",
        "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkNmNkNWM3Y2YzNzMwOTU3YTk4YjlkIn0sImlhdCI6MTc0MjEzMDUzN30.MAwC41HC21HpJEQbrG8BNCSBgyTw4zHIXJ494aIyCl0",
        "role": "owner"
      }
    }
    await addFleet(requestData);
  };

  return (
    <>
      <div className="px-6 py-4"></div>
      <h2 className="text-2xl font-bold my-4">Add Car to Fleet</h2>
      <form className="w-full max-w-lg" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="model">
              Model
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="model"
              type="text"
              placeholder="Model"
              {...register('model')}
              onChange={handleChange}
            />
            {errors.model && <p className="text-red-500 text-xs italic">{errors.model.message}</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="brand">
              Brand
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="brand"
              type="text"
              placeholder="Brand"
              {...register('brand')}
              onChange={handleChange}
            />
            {errors.brand && <p className="text-red-500 text-xs italic">{errors.brand.message}</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="type">
              Type
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="type"
              type="text"
              placeholder="Type"
              {...register('type')}
              onChange={handleChange}
            />
            {errors.type && <p className="text-red-500 text-xs italic">{errors.type.message}</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="seats">
              Seats
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="seats"
              type="text"
              placeholder="Seats"
              {...register('seats')}
              onChange={handleChange}
            />
            {errors.seats && <p className="text-red-500 text-xs italic">{errors.seats.message}</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="number">
              Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="number"
              type="text"
              placeholder="Number"
              {...register('number')}
              onChange={handleChange}
            />
            {errors.number && <p className="text-red-500 text-xs italic">{errors.number.message}</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="year">
              Year
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="year"
              type="text"
              placeholder="Year"
              {...register('year')}
              onChange={handleChange}
            />
            {errors.year && <p className="text-red-500 text-xs italic">{errors.year.message}</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="desc">
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="desc"
              placeholder="Description"
              {...register('desc')}
              onChange={handleChange}
            ></textarea>
            {errors.desc && <p className="text-red-500 text-xs italic">{errors.desc.message}</p>}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-primary-dark w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Fleet
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold my-4">Fleet List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car, index) => (
          <div key={index} className="p-4 border rounded shadow-sm">
            <h3 className="text-xl font-bold mb-2">{car.model}</h3>
            <p><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Type:</strong> {car.type}</p>
            <p><strong>Seats:</strong> {car.seats}</p>
            <p><strong>Number:</strong> {car.number}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Description:</strong> {car.desc}</p>
            <button className="bg-red-500 text-white py-1 px-3 rounded mt-2">
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>

    </>
  );
};

export default UpdateFleet;