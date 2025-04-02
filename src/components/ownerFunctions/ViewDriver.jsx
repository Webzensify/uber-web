import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaBan } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const ViewDriver = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState({}); // Store vehicle details for drivers

  // Fetch all drivers from the backend
  const fetchDrivers = async () => {
    try {
      const response = await axios.get("/api/owner/allDrivers", {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      setDrivers(response.data.drivers);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to fetch drivers");
    }
  };

  // Fetch vehicle details for a specific driver
  const fetchVehicleDetails = async (driverId) => {
    try {
      const response = await axios.get(`/api/driver/getVehicle/${driverId}`, {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      setVehicleDetails((prev) => ({
        ...prev,
        [driverId]: response.data.vehicle,
      }));
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to fetch vehicle details");
    }
  };

  // Block a driver
  const handleBlock = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to block this driver?")) {
        return;
      }
      if (!window.confirm("Are you sure you want to block this driver?")) {
        return;
      }
      await axios.put(
        `/api/owner/blockDriver/${id}`,
        {},
        {
          headers: {
            authtoken: localStorage.getItem("token"),
            role: localStorage.getItem("userType"),
          },
        }
      );
      toast.success("Driver blocked successfully");
      setDrivers(
        drivers.map((driver) =>
          driver._id === id ? { ...driver, status: "blocked" } : driver
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to block driver");
    }
  };

  // Delete a driver
  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this driver?")) {
        return;
      }
      await axios.delete(`/api/owner/deleteDriver/${id}`, {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      toast.success("Driver deleted successfully");
      setDrivers(drivers.filter((driver) => driver._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to delete driver");
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">View Drivers</h2>
      <div className="grid grid-cols-1 gap-4">
        {drivers.map((driver) => (
          <div
            key={driver._id}
            className="p-4 border rounded shadow-sm flex flex-col space-y-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <p>
                  <strong>Driver ID:</strong> {driver._id}
                </p>
                <p>
                  <strong>Name:</strong> {driver.name}
                </p>
                <p>
                  <strong>Address:</strong> {driver.address || "N/A"}
                </p>
                <p>
                  <strong>Phone Number:</strong> {driver.mobileNumber}
                </p>
                <p>
                  <strong>Aadhaar Number:</strong> {driver.aadhaarNumber}
                </p>
                <p>
                  <strong>License Number:</strong> {driver.licenseNumber}
                </p>
                <p>
                  <strong>Verified:</strong> {driver.isVerified.toString()}
                </p>
                <p>
                  <strong>Available:</strong> {driver.isAvailable.toString()}
                </p>
              </div>
              <div className="flex space-x-2">
                {driver.status !== "blocked" && (
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded"
                    onClick={() => handleBlock(driver._id)}
                  >
                    <FaBan />
                  </button>
                )}
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded"
                  onClick={() => handleDelete(driver._id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white py-1 px-3 rounded"
                onClick={() => fetchVehicleDetails(driver._id)}
              >
                Show Vehicle Details
              </button>
              {vehicleDetails[driver._id] && (
                <div className="mt-2 p-2 border rounded bg-gray-100">
                  <p>
                    <strong>Model:</strong> {vehicleDetails[driver._id].model}
                  </p>
                  <p>
                    <strong>Brand:</strong> {vehicleDetails[driver._id].brand}
                  </p>
                  <p>
                    <strong>Type:</strong> {vehicleDetails[driver._id].type}
                  </p>
                  <p>
                    <strong>Seats:</strong> {vehicleDetails[driver._id].seats}
                  </p>
                  <p>
                    <strong>Number:</strong> {vehicleDetails[driver._id].number}
                  </p>
                  <p>
                    <strong>Year:</strong> {vehicleDetails[driver._id].year}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {vehicleDetails[driver._id].desc}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDriver;
