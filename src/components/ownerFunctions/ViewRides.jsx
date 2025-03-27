import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewRides = () => {
  const [rides, setRides] = useState([]);

  // Fetch all rides from the backend
  const fetchRides = async () => {
    try {
      const response = await axios.get('/api/owner/allRides', {
        headers: {
          authtoken: localStorage.getItem('token'),
          role: localStorage.getItem('userType'),
        },
      });
      console.log(response.data);
      setRides(response.data.rides);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to fetch rides');
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">View Rides</h2>
      <div className="space-y-4">
        {rides.map((ride) => (
          <div key={ride._id} className="p-4 border rounded shadow-sm flex justify-between items-center">
            <div>
              <p><strong>Pickup Location:</strong> {ride.pickupLocation}</p>
              <p><strong>Dropoff Location:</strong> {ride.dropoffLocation}</p>
              <p><strong>Status:</strong> {ride.status}</p>
              <p><strong>Driver Name:</strong> {ride.driverId?.name || 'N/A'}</p>
              <p><strong>Driver Phone:</strong> {ride.driverId?.mobileNumber || 'N/A'}</p>
              <p><strong>User Name:</strong> {ride.userId?.name || 'N/A'}</p>
              <p><strong>User Phone:</strong> {ride.userId?.mobileNumber || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRides;