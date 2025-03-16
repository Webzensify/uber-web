import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaDeleteLeft } from 'react-icons/fa6';
import { FiDelete } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';

const fleetSchema = z.object({
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  vehicleModel: z.string().min(1, 'Vehicle model is required'),
  vehicleCapacity: z.number().min(1, 'Vehicle capacity must be at least 1'),
  vehicleRegistration: z.instanceof(File, 'Vehicle registration is required').refine(file => file && file.type.startsWith('image/'), 'Vehicle registration must be an image'),
  vehicleNoPlate: z.string().min(1, 'Vehicle number plate is required'),
  vehicleDescription: z.string().min(1, 'Vehicle description is required'),
});

const UpdateFleet = () => {
  const [fleets, setFleets] = useState([
    {
      vehicleType: 'Sedan',
      vehicleModel: 'Toyota Camry',
      vehicleCapacity: 5,
      vehicleNoPlate: 'ABC123',
      vehicleDescription: 'Comfortable sedan with air conditioning',
    },
    {
      vehicleType: 'SUV',
      vehicleModel: 'Honda CR-V',
      vehicleCapacity: 7,
      vehicleNoPlate: 'XYZ789',
      vehicleDescription: 'Spacious SUV with ample luggage space',
    },
  ]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(fleetSchema),
  });

  const handleRegistrationUpload = (e) => {
    setValue('vehicleRegistration', e.target.files[0]);
  };

  const onSubmit = (data) => {
    setFleets([...fleets, data]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Update Fleet</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="vehicleType" className="block text-gray-700">Vehicle Type</label>
          <select
            id="vehicleType"
            {...register('vehicleType')}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Vehicle Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">SUV</option>

          </select>
          {errors.vehicleType && <p className="text-red-500 text-xs italic">{errors.vehicleType.message}</p>}
        </div>
        <div>
          <label htmlFor="vehicleModel" className="block text-gray-700">Vehicle Model</label>
          <input
            type="text"
            id="vehicleModel"
            {...register('vehicleModel')}
            className="w-full p-2 border rounded"
          />
          {errors.vehicleModel && <p className="text-red-500 text-xs italic">{errors.vehicleModel.message}</p>}
        </div>
        <div>
          <label htmlFor="vehicleCapacity" className="block text-gray-700">Vehicle Capacity</label>
          <input
            type="number"
            id="vehicleCapacity"
            {...register('vehicleCapacity', { valueAsNumber: true })}
            className="w-full p-2 border rounded"
          />
          {errors.vehicleCapacity && <p className="text-red-500 text-xs italic">{errors.vehicleCapacity.message}</p>}
        </div>
        <div>
          <label htmlFor="vehicleRegistration" className="block text-gray-700">Vehicle Registration</label>
          <input
            type="file"
            id="vehicleRegistration"
            onChange={handleRegistrationUpload}
            className="w-full p-2 border rounded"
          />
          {errors.vehicleRegistration && <p className="text-red-500 text-xs italic">{errors.vehicleRegistration.message}</p>}
        </div>
        <div>
          <label htmlFor="vehicleNoPlate" className="block text-gray-700">Vehicle No. Plate</label>
          <input
            type="text"
            id="vehicleNoPlate"
            {...register('vehicleNoPlate')}
            className="w-full p-2 border rounded"
          />
          {errors.vehicleNoPlate && <p className="text-red-500 text-xs italic">{errors.vehicleNoPlate.message}</p>}
        </div>
        <div>
          <label htmlFor="vehicleDescription" className="block text-gray-700">Vehicle Description</label>
          <textarea
            id="vehicleDescription"
            {...register('vehicleDescription')}
            className="w-full p-2 border rounded"
          />
          {errors.vehicleDescription && <p className="text-red-500 text-xs italic">{errors.vehicleDescription.message}</p>}
        </div>
        <button type="submit" className="bg-primary-dark text-white py-2 px-5 rounded">Submit</button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4 overflow-clip ">Fleet List</h2>
      <div className="space-y-4 space-x-2 flex flex-wrap overflow-clip ">
        {fleets.map((fleet, index) => (
          <div key={index} className="p-4 border rounded shadow-sm flex md:w-9/19 lg:md:1/3 justify-between h-42">
            <div>
            <p><strong>Type:</strong> {fleet.vehicleType}</p>
            <p><strong>Model:</strong> {fleet.vehicleModel}</p>
            <p><strong>Capacity:</strong> {fleet.vehicleCapacity}</p>
            <p><strong>No. Plate:</strong> {fleet.vehicleNoPlate}</p>
            <p><strong>Description:</strong> {fleet.vehicleDescription}</p>
            </div>
            <div>
            <button className="bg-red-500 text-white py-1 px-3 rounded mt-2">
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