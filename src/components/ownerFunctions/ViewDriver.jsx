import React, { useState } from 'react';
import { FaTrashAlt, FaBan } from 'react-icons/fa';

const ViewDriver = () => {
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: 'John Doe',
      address: '123 Main St, Springfield',
      phoneNumber: '1234567890',
      aadhaar: 'aadhaar1.png',
      license: 'license1.png',
    },
    {
      id: 2,
      name: 'Jane Smith',
      address: '456 Elm St, Springfield',
      phoneNumber: '0987654321',
      aadhaar: 'aadhaar2.png',
      license: 'license2.png',
    },
  ]);

  const handleBlock = (id) => {
    // Logic to block the driver
    console.log(`Block driver with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Logic to delete the driver
    setDrivers(drivers.filter(driver => driver.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">View Drivers</h2>
      <div className="space-y-4">
        {drivers.map((driver) => (
          <div key={driver.id} className="p-4 border rounded shadow-sm flex justify-between items-center">
            <div>
              <p><strong>Name:</strong> {driver.name}</p>
              <p><strong>Address:</strong> {driver.address}</p>
              <p><strong>Phone Number:</strong> {driver.phoneNumber}</p>
              <p><strong>Aadhaar:</strong> {driver.aadhaar}</p>
              <p><strong>License:</strong> {driver.license}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-yellow-500 text-white py-1 px-3 rounded"
                onClick={() => handleBlock(driver.id)}
              >
                <FaBan />
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded"
                onClick={() => handleDelete(driver.id)}
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

export default ViewDriver;