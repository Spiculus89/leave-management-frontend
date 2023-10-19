import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateLeaveStatus } from "../store/actions/leaveActions";
import { toast } from "react-toastify";

const StatusModal = ({ open, request, setOpen }) => {
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    const updatedRequest = {
      user: request.user,
      reason: request.reason,
      startDate: request.startDate,
      endDate: request.endDate,
      leaveType: request.leaveType,
      workingDays: request.workingDays,
      status: status,
    };
    e.preventDefault();
    if (status === "Approved" || "Cancelled") {
      dispatch(updateLeaveStatus(request._id, updatedRequest));
    } else {
      toast.error("Please select a status!");
    }
  };
  const handleCloseModal = (id) => {
    setOpen();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[800px] flex flex-col items-center">
        <button onClick={handleCloseModal} className="text-white text-xl">
          X
        </button>
        <form className=" w-1/2" onSubmit={handleSubmit}>
          <label className="block font-bold text-xl mb-2">Update Status</label>
          <select
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select a status</option>
            <option value="Approved">Approved</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            type="submit"
            className="block w-full px-4 py-2 mt-4 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            Update Status
          </button>
        </form>
      </div>
    </div>
  );
};

export default StatusModal;
