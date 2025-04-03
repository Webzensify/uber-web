import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const fleetSchema = z.object({
  _id: z.string().optional(),
  model: z.string().min(1, "Model is required"),
  brand: z.string().min(1, "Brand is required"),
  type: z.string().min(1, "Type is required"),
  seats: z.number().min(1, "Seats must be at least 1"),
  number: z
    .string()
    .regex(
      /^[A-Z]{2}[ -][0-9]{1,2}(?:[A-Z])?(?:[A-Z]*)?[0-9]{4}$/,
      "Invaid number plate"
    ),
  year: z.number().min(1900, "Year must be valid"),
  desc: z.string().min(1, "Description is required"),
});

const Fleet = () => {
  const [fleets, setFleets] = useState([]);
  const [filteredFleets, setFilteredFleets] = useState([]);
  const [filter, setFilter] = useState({
    model: "",
    brand: "",
    type: "",
  });
  const [editingFleetId, setEditingFleetId] = useState(null);
  const [isAddingFleet, setIsAddingFleet] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fleetSchema),
  });

  const fetchFleets = async () => {
    try {
      const response = await axios.get("/api/owner/getCars", {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      setFleets(response.data.cars);
      setFilteredFleets(response.data.cars);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to fetch fleet data");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));

    const filtered = fleets.filter((fleet) => {
      return (
        (filter.model === "" || fleet.model === filter.model) &&
        (filter.brand === "" || fleet.brand === filter.brand) &&
        (filter.type === "" || fleet.type === filter.type)
      );
    });

    setFilteredFleets(filtered);
  };

  const handleAddFleet = async (data) => {
    try {
      if (!window.confirm("Are you sure you want to add this vehicle?")) {
        return;
      }
      const response = await axios.post("/api/owner/addCar", data, {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      toast.success("Vehicle added successfully");
      setFleets([...fleets, response.data.car]);
      setFilteredFleets([...fleets, response.data.car]);
      reset();
      setIsAddingFleet(false);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add vehicle");
    }
  };

  const handleEditSubmit = async (data) => {
    try {
      if (!window.confirm("Are you sure you want to update this vehicle?")) {
        return;
      }
      const response = await axios.put(
        `/api/owner/editCar/${editingFleetId}`,
        data,
        {
          headers: {
            authtoken: localStorage.getItem("token"),
            role: localStorage.getItem("userType"),
          },
        }
      );
      toast.success("Vehicle updated successfully");
      const updatedFleets = fleets.map((fleet) =>
        fleet._id === editingFleetId ? response.data.car : fleet
      );
      setFleets(updatedFleets);
      setFilteredFleets(updatedFleets);
      setEditingFleetId(null);
      reset();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update vehicle");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this vehicle?")) {
        return;
      }
      await axios.delete(`/api/owner/deleteCar/${id}`, {
        headers: {
          authtoken: localStorage.getItem("token"),
          role: localStorage.getItem("userType"),
        },
      });
      toast.success("Vehicle deleted successfully");
      const updatedFleets = fleets.filter((fleet) => fleet._id !== id);
      setFleets(updatedFleets);
      setFilteredFleets(updatedFleets);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to delete vehicle");
    }
  };

  const handleEdit = (fleet) => {
    reset(fleet);
    setEditingFleetId(fleet._id);
    setIsAddingFleet(false);
  };

  useEffect(() => {
    fetchFleets();
  }, []);

  return (
    <div className="space-y-4 px-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold my-4">Fleet</h2>
        <button
          className="bg-green-500 text-white py-1 px-3 rounded"
          onClick={() => {
            setIsAddingFleet(!isAddingFleet);
            setEditingFleetId(null);
            reset();
          }}
        >
          Add Fleet
        </button>
      </div>

      {/* Add Fleet Form */}
      {isAddingFleet && (
        <form
          onSubmit={handleSubmit(handleAddFleet)}
          className="space-y-4 border p-4 rounded shadow-sm"
        >
          <div>
            <label htmlFor="model" className="block font-bold">
              Model
            </label>
            <select
              id="model"
              {...register("model")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Model</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
            </select>
            {errors.model && (
              <p className="text-red-500 text-xs">{errors.model.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="brand" className="block font-bold">
              Brand
            </label>
            <select
              id="brand"
              {...register("brand")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Brand</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Ford">Ford</option>
            </select>
            {errors.brand && (
              <p className="text-red-500 text-xs">{errors.brand.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="type" className="block font-bold">
              Type
            </label>
            <select
              id="type"
              {...register("type")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Type</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs">{errors.type.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="seats" className="block font-bold">
              Passenger Seats
            </label>
            <input
              type="number"
              id="seats"
              {...register("seats", { valueAsNumber: true })}
              className="w-full p-2 border rounded"
            />
            {errors.seats && (
              <p className="text-red-500 text-xs">{errors.seats.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="number" className="block font-bold">
              Number Plate:
            </label>
            <input
              type="text"
              id="number"
              {...register("number")}
              className="w-full p-2 border rounded"
            />
            {errors.number && (
              <p className="text-red-500 text-xs">{errors.number.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="year" className="block font-bold">
              Year
            </label>
            <input
              type="number"
              id="year"
              {...register("year", { valueAsNumber: true })}
              className="w-full p-2 border rounded"
            />
            {errors.year && (
              <p className="text-red-500 text-xs">{errors.year.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="desc" className="block font-bold">
              Description
            </label>
            <textarea
              id="desc"
              {...register("desc")}
              className="w-full p-2 border rounded"
            />
            {errors.desc && (
              <p className="text-red-500 text-xs">{errors.desc.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      )}

      {/* Filter Section */}
      <div className="flex space-x-4 mb-4">
        <div>
          <label htmlFor="filterModel" className="block font-bold">
            Model
          </label>
          <select
            id="filterModel"
            name="model"
            value={filter.model}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Models</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>
        <div>
          <label htmlFor="filterBrand" className="block font-bold">
            Brand
          </label>
          <select
            id="filterBrand"
            name="brand"
            value={filter.brand}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Brands</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
          </select>
        </div>
        <div>
          <label htmlFor="filterType" className="block font-bold">
            Type
          </label>
          <select
            id="filterType"
            name="type"
            value={filter.type}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
      </div>

      {/* Fleet List */}
      <div className="space-y-4">
        {filteredFleets.map((fleet) => (
          <div
            key={fleet._id}
            className="p-4 border rounded shadow-sm flex justify-between"
          >
            {editingFleetId === fleet._id ? (
              <form
                onSubmit={handleSubmit(handleEditSubmit)}
                className="flex-1 space-y-2"
              >
                <input
                  type="hidden"
                  {...register("_id")}
                  defaultValue={fleet._id}
                />
                <div>
                  <label htmlFor="model" className="block font-bold">
                    Model
                  </label>
                  <select
                    id="model"
                    {...register("model")}
                    defaultValue={fleet.model}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                  {errors.model && (
                    <p className="text-red-500 text-xs">
                      {errors.model.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="brand" className="block font-bold">
                    Brand
                  </label>
                  <select
                    id="brand"
                    {...register("brand")}
                    defaultValue={fleet.brand}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Ford">Ford</option>
                  </select>
                  {errors.brand && (
                    <p className="text-red-500 text-xs">
                      {errors.brand.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="type" className="block font-bold">
                    Type
                  </label>
                  <select
                    id="type"
                    {...register("type")}
                    defaultValue={fleet.type}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-xs">
                      {errors.type.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="seats" className="block font-bold">
                    Passenger Seats
                  </label>
                  <select
                    id="seats"
                    {...register("seats", { valueAsNumber: true })}
                    defaultValue={fleet.seats}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Seats</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                  {errors.seats && (
                    <p className="text-red-500 text-xs">
                      {errors.seats.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="number" className="block font-bold">
                    Number Plate:
                  </label>
                  <input
                    type="text"
                    id="number"
                    {...register("number")}
                    defaultValue={fleet.number}
                    className="w-full p-2 border rounded"
                  />
                  {errors.number && (
                    <p className="text-red-500 text-xs">
                      {errors.number.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="year" className="block font-bold">
                    Year
                  </label>
                  <select
                    id="year"
                    {...register("year", { valueAsNumber: true })}
                    defaultValue={fleet.year}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  {errors.year && (
                    <p className="text-red-500 text-xs">
                      {errors.year.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="desc" className="block font-bold">
                    Description
                  </label>
                  <textarea
                    id="desc"
                    {...register("desc")}
                    defaultValue={fleet.desc}
                    className="w-full p-2 border rounded"
                  />
                  {errors.desc && (
                    <p className="text-red-500 text-xs">
                      {errors.desc.message}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingFleetId(null)}
                    className="bg-gray-500 text-white py-1 px-3 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex-1">
                <p>
                  <strong>Fleet Id:</strong>
                  {fleet._id}
                </p>
                <p>
                  <strong>Model:</strong> {fleet.model}
                </p>
                <p>
                  <strong>Brand:</strong> {fleet.brand}
                </p>
                <p>
                  <strong>Type:</strong> {fleet.type}
                </p>
                <p>
                  <strong>Passenger Seats:</strong> {fleet.seats}
                </p>
                <p>
                  <strong>Number Plate:</strong> {fleet.number}
                </p>
                <p>
                  <strong>Year:</strong> {fleet.year}
                </p>
                <p>
                  <strong>Description:</strong> {fleet.desc}
                </p>
              </div>
            )}
            <div className="flex space-x-2">
              {editingFleetId !== fleet._id && (
                <button
                  onClick={() => handleEdit(fleet)}
                  className="bg-blue-500 text-white py-1 h-1/2 my-auto px-3 rounded"
                >
                  Edit
                </button>
              )}
              {editingFleetId !== fleet._id && (
                <button
                  onClick={() => handleDelete(fleet._id)}
                  className="bg-red-500 text-white py-1 h-1/2 my-auto px-3 rounded"
                >
                  <FaTrashAlt />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
