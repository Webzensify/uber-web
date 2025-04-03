import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageRides = () => {
  const [rides, setRides] = useState([]); // State to hold all rides
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchRides();
  }, []);

  // Fetch all rides from the backend
  const fetchRides = async () => {
    try {
      setLoading(true); 
      const response = await axios.get("/api/admin/allRides", {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      console.log("Fetched rides:", response.data.rides);
      setRides(response.data.rides || []); // Ensure rides is always an array
    } catch (error) {
      toast.error(
        error.response?.data?.msg + error.response?.data?.error ||
          "Error fetching rides"
      );
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const cancelRide = async (rideId) => {
    if (!window.confirm("Are you sure you want to cancel this ride?")) {
      return;
    }
    // Prompt the user for a cancellation reason
    const reason = prompt("Please provide a reason for cancellation:");
    if (!reason) {
      toast.error("Cancellation reason is required.");
      return;
    }

    try {
      const response = await axios.put(
        `/api/admin/cancelRide/${rideId}`,
        { rideId, reason },
        {
          headers: {
            authtoken: localStorage.getItem("token"),
            role: localStorage.getItem("userType"),
          },
        }
      );
      toast.success(response.data.msg);
      // Update the rides list after cancellation
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride._id === rideId
            ? { ...ride, status: "cancelled", cancelDetails: { reason } }
            : ride
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error cancelling the ride");
      console.error("Error cancelling the ride:", error);
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
              {ride.status !== "cancelled" && ride.status !== "completed" && (
                <button
                  onClick={() => cancelRide(ride._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded mt-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRides;
