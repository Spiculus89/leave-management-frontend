import React, { useState } from "react";
import { Link } from "react-router-dom";
import walterIcon from "../images/walter_icon.png";
import { register } from "../store/actions/authActions";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const [creds, setCreds] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <img className="mx-auto" alt="WalterCode logo" src={walterIcon} />
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Register to HR app
            </label>
            <input
              onChange={(e) => setCreds({ ...creds, username: e.target.value })}
              placeholder="Username"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <input
              onChange={(e) => setCreds({ ...creds, email: e.target.value })}
              placeholder="Email address"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <input
              onChange={(e) => setCreds({ ...creds, password: e.target.value })}
              placeholder="Password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(register(creds));
              }}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Already have an account?{" "}
          <Link
            to="/login"
            relative="path"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
