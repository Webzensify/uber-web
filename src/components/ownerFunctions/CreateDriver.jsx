import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";

const schema = z.object({
  mobileNumber: z
    .string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  otp: z.string().length(6, "OTP must be exactly 6 digits").optional(),
  name: z.string().min(1, "Name is required").regex(/^[a-zA-Z ]*$/, "Name must contain only letters"),
  address: z.string().min(1, "Address is required"),
  aadhaarNumber: z
    .string()
    .length(12, "Aadhaar number must be exactly 12 digits"),
  licenseNumber: z.string().min(1, "License number is required"),
  email: z.union( [
    z.literal( '' ),
    z.string().email(),
] ),
});

const CreateDriver = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Send OTP to the driver
  const handleSendOtp = async (data) => {
    try {
      await axios.post(
        "/api/auth/send-otp",
        { mobileNumber: `+91${data.mobileNumber}`, role: "driver" },
        {
          headers: {
            authtoken: localStorage.getItem("token"),
            role: localStorage.getItem("userType"),
          },
        }
      );
      setIsOtpSent(true);
      toast.success("OTP sent successfully");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to send OTP");
    }
  };

  // Register the driver
  const handleRegister = async (data) => {
    try {
      if (!window.confirm("Are you sure you want to register this driver?")) {
        return;
      }
      await axios
        .post(
          "/api/auth/addDriver",
          {
            mobileNumber: data.mobileNumber,
            name: data.name,
            address: data.address,
            licenseNumber: data.licenseNumber,
            aadhaarNumber: data.aadhaarNumber,
            email: data.email,
            role: "driver",
            otp: data.otp,
          },
          {
            headers: {
              authtoken: localStorage.getItem("token"),
              role: localStorage.getItem("userType"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
      toast.success("Driver registered successfully");
      reset();
      setIsOtpSent(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || "Failed to register driver");
    }
  };

  // Handle form submission
  const onSubmit = (data) => {
    if (!isOtpSent) {
      handleSendOtp(data);
    } else {
      handleRegister(data);
    }
  };

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold my-4">Create Driver</h2>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address")}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.address && (
              <p className="text-red-500 text-xs italic">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label
              htmlFor="mobileNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              {...register("mobileNumber")}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs italic">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="aadhaarNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Aadhaar Number
            </label>
            <input
              type="text"
              id="aadhaarNumber"
              {...register("aadhaarNumber")}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.aadhaarNumber && (
              <p className="text-red-500 text-xs italic">
                {errors.aadhaarNumber.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label
              htmlFor="licenseNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              License Number
            </label>
            <input
              type="text"
              id="licenseNumber"
              {...register("licenseNumber")}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.licenseNumber && (
              <p className="text-red-500 text-xs italic">
                {errors.licenseNumber.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        {isOtpSent && (
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                htmlFor="otp"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                {...register("otp")}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.otp && (
                <p className="text-red-500 text-xs italic">
                  {errors.otp.message}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-primary-dark w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isOtpSent ? "Register" : "Send OTP"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDriver;
