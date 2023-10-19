import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewLeave } from "../store/actions/leaveActions";
import { calculateBusinessDays } from "../helpers";
import { toast } from "react-toastify";

const LeaveApply = () => {
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      user: user._id,
      username: user.username,
      reason,
      startDate,
      endDate,
      leaveType,
      workingDays: calculateBusinessDays(startDate, endDate),
    };
    let error = [];
    if (!request.leaveType) {
      error.push("Please select a leave type!");
    } else if (!request.reason) {
      error.push("Please add a reason for leave!");
    } else if (!request.startDate) {
      error.push("Please select a start date!");
    } else if (!request.endDate) {
      error.push("Please select a end date!");
    } else if (request.startDate >= request.endDate) {
      error.push("Please choose a higher end date!");
    } else if (request.workingDays <= 0) {
      error.push("You dont need to apply for a leave on weekends!");
    }
    if (error.length > 0) {
      error.map((err) => toast.error(err));
    } else {
      dispatch(createNewLeave(request));
      setEndDate("");
      setLeaveType("");
      setReason("");
      setStartDate("");
    }
  };

  return (
    <div className=" w-full flex justify-center mt-5">
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
        <label className="block font-bold text-xl mt-4 mb-2">Start Date</label>
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
          Apply for Leave
        </button>
      </form>
      <span className=" bg-purple-700 p-0.5 mx-11 "></span>
      <div className=" w-1/3 flex flex-col justify-center overflow-hidden">
        <div className="my-6">
          <div className="bg-white rounded-md shadow-md p-4 mt-4">
            <div className="mb-4">
              <h1 className=" font-bold text-xl text-purple-700">FAQ</h1>
            </div>
            <div className="mb-4">
              <div className="font-medium text-lg mb-2">
                When can I apply for the leave at the latest?
              </div>
              <div className="text-gray-800">
                You can apply for leave at any time, but we recommend applying
                as early as possible to ensure that your leave request can be
                processed in a timely manner.
              </div>
            </div>
            <div className="mb-4">
              <div className="font-medium text-lg mb-2">
                How descriptive should I be with reasons for leave?
              </div>
              <div className="text-gray-800">
                Please provide as much detail as possible when stating your
                reasons for leave. This will help us understand your situation
                and make a fair decision about your leave request.
              </div>
            </div>
            <div className="mb-4">
              <div className="font-medium text-lg mb-2">
                If my leave period includes non-working days, will they be
                excluded from my leave?
              </div>
              <div className="text-gray-800">
                It depends on the company's policy, but generally non-working
                days are not counted as part of the leave period. But, it is
                recommended to check with the company's HR for the official
                policy.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveApply;
