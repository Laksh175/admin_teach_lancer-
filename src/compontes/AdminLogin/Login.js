import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminLogin } from "../../store/action/addData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../validation";

const Login = ({ dispatch, res }) => {
  const [data, setData] = useState(
    {
      email: "",
      password: "",
    },
  );

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = () => {
    dispatch(adminLogin(data));
  };
  useEffect(() => {
    const dataa = res.data && res.data.data;
    if (dataa) {
      if (dataa.code == 200) {
        toast.success(dataa.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        localStorage.setItem("token", dataa.token);
        setTimeout(() => {
          window.location = "/home";
        }, 3000);
      }
      if (dataa.code == 401) {
        toast.warning(dataa.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  }, [res]);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] px-4">
        {/* Card */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Admin Login</h2>
            <p className="text-gray-300 mt-2">
              Welcome back! Please login to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Email Address
              </label>
              <input
                type="text"
                placeholder="admin@example.com"
                {...register("email")}
                name="email"
                value={data.email}
                onChange={onHandleChange}
                className={`w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border 
              ${errors.email ? "border-red-500" : "border-white/30"}
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
              />
              <p className="text-red-400 text-sm mt-1">
                {errors.email?.message}
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                name="password"
                value={data.password}
                onChange={onHandleChange}
                className={`w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border 
              ${errors.password ? "border-red-500" : "border-white/30"}
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
              />
              <p className="text-red-400 text-sm mt-1">
                {errors.password?.message}
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white 
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-indigo-600 hover:to-blue-600
            transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">Secure Admin Panel Access</p>
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.adminLogin,
});

export default connect(mapStateToProps)(Login);
