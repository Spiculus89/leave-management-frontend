import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { clearAll } from "../store/actions/leaveActions";
import { signOut } from "../store/actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex flex-row-reverse">
      <div className="relative">
        <FaUserAlt
          className="w-8 h-8 rounded-full cursor-pointer hover:text-purple-700"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        {dropdownOpen && (
          <div className="absolute right-0 w-48 mt-4 py-2 bg-white rounded-md shadow-md">
            <p className="text-gray-800 px-4 py-2">{user.username}</p>
            <p className="text-gray-800 px-4 py-2">{user.email}</p>
            <button
              className="block px-4 py-2 text-red-500 hover:bg-red-100 hover:text-red-600"
              onClick={() => {
                sessionStorage.removeItem("token");
                toast.success("Goodbye!");
                dispatch(signOut);
                navigate("/login", { replace: true });
                dispatch(clearAll);
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
