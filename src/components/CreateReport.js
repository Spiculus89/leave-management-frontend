import React, { useState } from "react";
import { createLeaveReport } from "../store/actions/leaveActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const CreateReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interval, setInterval] = useState("day");
  const [startDateReport, setStartDateReport] = useState("");
  const [endDateReport, setEndDateReport] = useState("");
  const [intervalReport, setIntervalReport] = useState("day");

  const dispatch = useDispatch();
  const reportData = useSelector((state) => state.leaves.report);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createLeaveReport(startDate, endDate, interval));
    setStartDateReport(startDate);
    setEndDateReport(endDate);
    setIntervalReport(interval);
  };

  return (
    <div className=" flex flex-col items-center mx-auto">
      <form
        className="bg-white p-6 rounded-lg text-center w-[400px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-medium mb-4">Create Leave Report</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Start Date
          </label>
          <input
            className="border border-gray-400 p-2 rounded-lg w-full"
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            End Date
          </label>
          <input
            className="border border-gray-400 p-2 rounded-lg w-full"
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Interval
          </label>
          <select
            className="border border-gray-400 p-2 rounded-lg w-full"
            value={interval}
            onChange={(event) => setInterval(event.target.value)}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
        <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">
          Create Report
        </button>
      </form>
      <table className="table-auto mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Interval</th>
            <th className="px-4 py-2">Leaves</th>
          </tr>
        </thead>
        <tbody>
          {reportData?.map((data) => (
            <tr key={data.id}>
              <td className="px-4 py-2">{data.username}</td>
              <td className="px-4 py-2">
                {moment(startDateReport).format("MMM Do YY")}
              </td>
              <td className="px-4 py-2">
                {moment(endDateReport).format("MMM Do YY")}
              </td>
              <td className="px-4 py-2">{intervalReport}</td>
              <td className="px-4 py-2">{data.leaves.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateReport;
