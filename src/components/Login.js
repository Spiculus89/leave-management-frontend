import React, { useState, useEffect } from "react";
import walterIcon from "../images/walter_icon.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import {
  clearAll,
  getAll,
  getAllRequests,
} from "../store/actions/leaveActions";
import { clearAllAuth } from "../store/actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const loggedIn = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.id);

  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      if (role === "admin") {
        dispatch(getAllRequests());
      } else {
        dispatch(getAll(userId));
      }
      navigate("/dashboard", { replace: true });
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  useEffect(() => {
    dispatch(clearAll());
    dispatch(clearAllAuth());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <img className="mx-auto" src={walterIcon} alt="WalterCode logo" />
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Login to HR app
            </label>
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
                dispatch(signIn(creds));
              }}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/register"
            relative="path"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
