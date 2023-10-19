import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import LeaveApply from "./LeaveApply";
import LeaveList from "./LeaveList";
import { useSelector } from "react-redux";
import CreateReport from "./CreateReport";

const Dashboard = () => {
  const [myLeaves, setMyLeaves] = useState(true);
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="flex w-screen">
      <Sidebar setMyLeaves={setMyLeaves} />
      <div className="flex flex-col w-screen">
        <Header />
        <div className=" flex">
          {myLeaves ? (
            <LeaveList />
          ) : role === "admin" ? (
            <CreateReport />
          ) : (
            <LeaveApply />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
