import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ViewUsers = () => {
  const [users, setUsers] = useState([]); // State to hold users
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get("/api/admin/allUsers", {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      setUsers(response.data.users || []); // Ensure users is always an array
      toast.success("Users fetched successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Error fetching users"
      );
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  if (loading) {
    return <div className="p-4">Loading Users...</div>; // Show a loading message while fetching
  }

  if (users.length === 0) {
    return <div className="p-4">No Users found.</div>; // Handle the case where no users are available
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">View Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 border rounded shadow-sm">
            <p>
              <strong>Name:</strong> {user.name || "N/A"}
            </p>
            <p>
              <strong>Mobile Number:</strong> {user.mobileNumber || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewUsers;