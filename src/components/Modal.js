import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateLeave } from "../store/actions/leaveActions";
import { calculateBusinessDays } from "../helpers";
import { toast } from "react-toastify";

const Modal = ({ open, request, setOpen }) => {
  const [leaveType, setLeaveType] = useState(request.leaveType);
  const [reason, setReason] = useState(request.reason);
  const [startDate, setStartDate] = useState(request.startDate);
  const [endDate, setEndDate] = useState(request.endDate);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRequest = {
      user: request.user,
      username: request.username,
      reason,
      startDate,
      endDate,
      leaveType,
      workingDays: calculateBusinessDays(startDate, endDate),
      status: request.status,
    };
    let error = [];
    if (!updatedRequest.leaveType) {
      error.push("Please select a leave type!");
    } else if (!updatedRequest.reason) {
      error.push("Please add a reason for leave!");
    } else if (!updatedRequest.startDate) {
      error.push("Please select a start date!");
    } else if (!updatedRequest.endDate) {
      error.push("Please select a end date!");
    } else if (updatedRequest.startDate >= updatedRequest.endDate) {
      error.push("Please choose a higher end date!");
    } else if (updatedRequest.workingDays <= 0) {
      error.push("You dont need to apply for a leave on weekends!");
    }
    if (error.length > 0) {
      error.map((err) => toast.error(err));
    } else {
      dispatch(updateLeave(request._id, updatedRequest));
      setEndDate("");
      setLeaveType("");
      setReason("");
      setStartDate("");
      setOpen();
    }
  };

  const handleCloseModal = () => {
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
          <label className="block font-bold text-xl mb-2">Leave Type</label>
          <select
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="">Select a leave type</option>
            <option value="Vacation">Vacation</option>
            <option value="Sick">Sick</option>
            <option value="Other">Other</option>
          </select>
          <label className="block font-bold text-xl mt-4 mb-2">Reason</label>
          <textarea
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
          <label className="block font-bold text-xl mt-4 mb-2">
            Start Date
          </label>
          <input
            type="date"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label className="block font-bold text-xl mt-4 mb-2">End Date</label>
          <input
            type="date"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            type="submit"
            className="block w-full px-4 py-2 mt-4 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            Update your Leave
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
