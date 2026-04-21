import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../service/AxiosInstance";

function Forgatepassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 async function sendlinkApi(payload) {
  try {
    const response = await axiosInstance.post('/auth/sendlink',payload)
    console.log(payload);
    
    alert(response.data.message)
  } catch (error) {
    alert(error.response.data.message)
  }
 }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(sendlinkApi)}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Forgate Password Link</h2>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Send Link
        </button>
      </form>
    </div>
  );
}

export default Forgatepassword;