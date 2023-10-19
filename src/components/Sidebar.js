import React, { useState } from "react";
import walterIcon from "../images/walter_icon.png";
import { BsFillStarFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

const Sidebar = ({ setMyLeaves }) => {
  const [dropDown, setDropDown] = useState(false);
  const role = useSelector((state) => state.auth.role);

  return (
    <div className=" bg-gray-600 w-1/5 h-screen ">
      <img
        className="mx-auto pt-11 pb-11"
        src={walterIcon}
        alt="WalterCode logo"
      />
      <h2
        onClick={() => setDropDown(!dropDown)}
        className="text-center text-white hover:text-blue-400 hover:cursor-pointer"
      >
        <BsFillStarFill className=" inline mr-2" />
        Leave
        <IoIosArrowDown className="ml-20 inline" />
      </h2>
      {role === "employee" ? (
        <li>
          {dropDown ? (
            <>
              <h2
                onClick={() => setMyLeaves(false)}
                className="text-center text-white hover:text-blue-400 hover:cursor-pointer"
              >
                Apply for leave
              </h2>
              <h2
                onClick={() => setMyLeaves(true)}
                className="text-center text-white hover:text-blue-400 hover:cursor-pointer"
              >
                My leaves
              </h2>
            </>
          ) : null}
        </li>
      ) : (
        <li>
          {dropDown ? (
            <>
              <h2
                onClick={() => setMyLeaves(true)}
                className="text-center text-white hover:text-blue-400 hover:cursor-pointer"
              >
                Leave requests
              </h2>
              <h2
                onClick={() => setMyLeaves(false)}
                className="text-center text-white hover:text-blue-400 hover:cursor-pointer"
              >
                Create report
              </h2>
            </>
          ) : null}
        </li>
      )}
      <div className=" text-white fixed bottom-2 text-sm flex flex-col items-center">
        <p>Copyright 2022 Walter Code.</p>
        <p>All rights reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;
