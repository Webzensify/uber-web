import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaBan } from "react-icons/fa";
import { toast } from "react-toastify";

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]); // Ensure drivers is initialized as an empty array
  const [loading, setLoading] = useState(true); // Add a loading state
  const [selectedDriver, setSelectedDriver] = useState(null); // State to hold selected driver details

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get("/api/admin/allDrivers", {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      setDrivers(response.data.drivers || []); // Ensure drivers is always an array
    } catch (error) {
      toast.error("Error fetching drivers");
      console.error("Error fetching drivers:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const fetchDriverDetails = async (driverId) => {
    try {
      const response = await axios.get(`/api/admin/driver/${driverId}`, {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      setSelectedDriver(response.data.driver); // Set the selected driver details
    } catch (error) {
      toast.error(
        error.response?.data?.msg + error.response?.data?.error ||
          "Error fetching driver details"
      );
      console.error("Error fetching driver details:", error);
    }
  };

  const blockDriver = async (driverId) => {
    try {
      if (!window.confirm("Are you sure you want to block this driver?")) {
        return;
      }
      await axios.put(`/api/admin/blockDriver/${driverId}`, {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      toast.success("Driver blocked successfully");
      fetchDrivers(); // Refresh the list
    } catch (error) {
      toast.error("Error blocking driver");
      console.error("Error blocking driver:", error);
    }
  };

  const deleteDriver = async (driverId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this driver?")) {
        return;
      }
      await axios.delete(`/api/admin/deleteDriver/${driverId}`, {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      toast.success("Driver deleted successfully");
      fetchDrivers(); // Refresh the list
    } catch (error) {
      toast.error("Error deleting driver");
      console.error("Error deleting driver:", error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading Drivers...</div>; // Show a loading message while fetching
  }

  if (drivers.length === 0) {
    return <div className="p-4">No Drivers found.</div>; // Handle the case where no drivers are available
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Drivers</h2>
      <div className="space-y-4">
        {drivers.map((driver) => (
          <div
            key={driver._id}
            className="p-4 border rounded shadow-sm flex justify-between items-center cursor-pointer"
            onClick={() => fetchDriverDetails(driver._id)} // Fetch driver details on click
          >
            <div>
              <p>
                <strong>Name:</strong> {driver.name}
              </p>
              <p>
                <strong>Mobile Number:</strong> {driver.mobileNumber}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-yellow-500 text-white py-1 px-3 rounded"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the card click
                  blockDriver(driver._id);
                }}
              >
                <FaBan /> Block
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the card click
                  deleteDriver(driver._id);
                }}
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal or Section to Show Selected Driver Details */}
      {selectedDriver && (
        <div className="mt-6 p-4 border rounded shadow-lg bg-white">
          <h3 className="text-xl font-bold mb-2">Driver Details</h3>
          <p>
            <strong>Name:</strong> {selectedDriver.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedDriver.email}
          </p>
          <p>
            <strong>Mobile Number:</strong> {selectedDriver.mobileNumber}
          </p>
          <p>
            <strong>Verified:</strong> {selectedDriver.isVerified.toString()}
          </p>
          <p>
            <strong>Owner:</strong> {selectedDriver.owner?.name || "N/A"}
          </p>
          <button
            className="mt-4 bg-gray-500 text-white py-1 px-3 rounded"
            onClick={() => setSelectedDriver(null)} // Close the details view
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageDrivers;
