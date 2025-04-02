import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ViewRides = () => {
  const [rides, setRides] = useState([]);

  // Fetch all rides from the backend
  const fetchRides = async () => {
    try {
      const response = await axios.get("/api/owner/allRides", {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      console.log(response.data);
      setRides(response.data.rides);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to fetch rides");
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
          <div key={ride._id} className="p-4 border rounded shadow-sm">
            <div>
              {ride.pickupLocation?.desc && (
                <p>
                  <strong>Pickup Location:</strong> {ride.pickupLocation.desc}
                </p>
              )}
              {ride.dropoffLocation?.desc && (
                <p>
                  <strong>Dropoff Location:</strong> {ride.dropoffLocation.desc}
                </p>
              )}
              {ride.status && (
                <p>
                  <strong>Status:</strong> {ride.status}
                </p>
              )}
              {ride.driverId?.name && (
                <p>
                  <strong>Driver Name:</strong> {ride.driverId.name}
                </p>
              )}
              {ride.driverId?.mobileNumber && (
                <p>
                  <strong>Driver Phone:</strong> {ride.driverId.mobileNumber}
                </p>
              )}
              {ride.userId?.name && (
                <p>
                  <strong>User Name:</strong> {ride.userId.name}
                </p>
              )}
              {ride.userId?.mobileNumber && (
                <p>
                  <strong>User Phone:</strong> {ride.userId.mobileNumber}
                </p>
              )}
              {ride.fare && (
                <p>
                  <strong>Fare:</strong> ₹{ride.fare}
                </p>
              )}
              {ride.paymentStatus && (
                <p>
                  <strong>Payment Status:</strong> {ride.paymentStatus}
                </p>
              )}
              {ride.distance && (
                <p>
                  <strong>Distance:</strong> {ride.distance} meters
                </p>
              )}
              {ride.duration && (
                <p>
                  <strong>Duration:</strong> {ride.duration} seconds
                </p>
              )}
              {ride.cancelDetails?.reason && (
                <p>
                  <strong>Cancel Reason:</strong> {ride.cancelDetails.reason}
                </p>
              )}
              {ride.quote?.length > 0 && (
                <div>
                  <strong>Quotes:</strong>
                  <strong>Quotes:</strong>
                  {ride.quote.map((q, index) => (
                    <div
                      key={index}
                      className="ml-4 p-2 border-2 border-black rounded-3xl"
                    >
                      <p>
                        - <strong>Driver:</strong> {q.driver}
                      </p>
                      {q.currentLocation && (
                        <>
                          <p>
                            - <strong>Driver&apos;s Address</strong>:{" "}
                            {q.currentLocation.desc}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRides;
