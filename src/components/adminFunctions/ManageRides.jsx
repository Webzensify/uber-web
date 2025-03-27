import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageRides = () => {
  const [rides, setRides] = useState([]); // State to hold all rides
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchRides();
  }, []);

  // Fetch all rides from the backend
  const fetchRides = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get('/api/admin/allRides', {
        headers: {
          authtoken: localStorage.getItem('token'),
          role: localStorage.getItem('userType'),
        },
      });
      setRides(response.data.rides || []); // Ensure rides is always an array
    } catch (error) {
      toast.error('Error fetching rides');
      console.error('Error fetching rides:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  if (loading) {
    return <div className="p-4">Loading Rides...</div>; // Show a loading message while fetching
  }

  if (rides.length === 0) {
    return <div className="p-4">No Rides found.</div>; // Handle the case where no rides are available
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Rides</h2>
      <div className="space-y-4">
        {rides.map((ride) => (
          <div
            key={ride._id}
            className="p-4 border rounded shadow-sm"
          >
            <h3 className="text-lg font-bold mb-2">Ride Details</h3>
            <p><strong>Pickup Location:</strong> {ride.pickupLocation.desc}</p>
            <p><strong>Dropoff Location:</strong> {ride.dropoffLocation.desc}</p>
            <p><strong>Status:</strong> {ride.status}</p>
            <p><strong>Fare:</strong> {ride.fare ? `$${ride.fare}` : 'N/A'}</p>
            <p><strong>Payment Status:</strong> {ride.paymentStatus}</p>
            <p><strong>Driver Name:</strong> {ride.driverId?.name || 'N/A'}</p>
            <p><strong>Driver Phone:</strong> {ride.driverId?.mobileNumber || 'N/A'}</p>
            <p><strong>User Name:</strong> {ride.userId?.name || 'N/A'}</p>
            <p><strong>User Phone:</strong> {ride.userId?.mobileNumber || 'N/A'}</p>

            {/* Display Quotes if Available */}
            {ride.quote && ride.quote.length > 0 && (
              <div>
                <h4 className="text-lg font-bold mt-4">Quotes</h4>
                {ride.quote.map((q, index) => (
                  <div key={index} className="p-2 border rounded mt-2">
                    <p><strong>Driver:</strong> {q.driver}</p>
                    <p><strong>Price:</strong> ${q.price}</p>
                    <p><strong>Current Location:</strong> {q.currentLocation?.desc || 'N/A'}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Display Cancellation Details if Ride is Cancelled */}
            {ride.status === 'cancelled' && ride.cancelDetails && (
              <div>
                <p><strong>Cancelled By:</strong> {ride.cancelDetails.by}</p>
                <p><strong>Reason:</strong> {ride.cancelDetails.reason}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRides;