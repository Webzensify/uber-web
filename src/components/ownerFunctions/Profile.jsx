import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, userType, logout, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    address: user?.address || "",
    aadhaarNumber: user?.aadhaarNumber || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (!window.confirm("Are you sure you want to save changes?")) {
        return;
      }
      const response = await axios.put("/api/owner/profile", formData, {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });

      // Update the user in AuthContext and localStorage
      const updatedUser = response.data.owner;
      try {
        setUser(updatedUser);
      } catch (error) {
        console.error("Error updating user in localStorage:", error);
        
      }

      localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage

      toast.success(response.data.msg || "Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error updating profile");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }
    try {
      const response = await axios.delete("/api/owner/deleteAccount", {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      toast.success(response.data.msg || "Account deleted successfully");
      logout();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error deleting account");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Owner Profile</h2>
      {user ? (
        <div className="space-y-4 border-2 border-gray-300 p-4 rounded">
          {isEditing ? (
            <>
              <div>
                <label className="block font-bold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-bold">Phone</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-bold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-bold">Aadhaar Number</label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white py-2 px-4 rounded mt-4"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded mt-4 ml-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {user.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {user.mobileNumber || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {user.address || "N/A"}
              </p>
              <p>
                <strong>Aadhaar Number:</strong> {user.aadhaarNumber || "N/A"}
              </p>
              <p>
                <strong>User Type:</strong> {userType || "N/A"}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white py-2 px-4 rounded mt-4 ml-2"
              >
                Delete Account
              </button>
            </>
          )}
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default Profile;