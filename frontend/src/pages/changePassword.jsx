import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../service/AxiosInstance";
import { useParams } from "react-router";


function ChangePasword() {
  const {token} = useParams()
  console.log(token)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function resentApi(data) {
    try {
      const payload = {password:data.password,token}
      const response = await axiosInstance.post('/auth/reset-password',payload)
      window.location.replace('/login')
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(resentApi)}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Forgate Password</h2>
           {/* Password */}
        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
          <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
     {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default ChangePasword;