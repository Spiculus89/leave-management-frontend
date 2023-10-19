import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { deleteLeave } from "../store/actions/leaveActions";
import Modal from "./Modal";
import StatusModal from "./StatusModal";

const LeaveList = () => {
  const leaveRequests = useSelector((state) => state.leaves.leaves);
  const dispatch = useDispatch();
  const [openModals, setOpenModals] = useState({});
  const [openStatusModals, setStatusModals] = useState({});
  const role = useSelector((state) => state.auth.role);

  const deleteLeaveRequest = (id) => {
    dispatch(deleteLeave(id));
  };

  return (
    <table className="table-auto">
      <thead>
        <tr>
          {role === "admin" ? <th className="px-4 py-2">User</th> : null}

          <th className="px-4 py-2">Leave Type</th>
          <th className="px-4 py-2">Start Date</th>
          <th className="px-4 py-2">End Date</th>
          <th className="px-4 py-2">Number of Days</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {leaveRequests.map((request) => (
          <tr key={request._id}>
            {role === "admin" ? (
              <td className="px-4 py-2">{request.username}</td>
            ) : null}
            <td className="px-4 py-2">{request.leaveType}</td>
            <td className="px-4 py-2">
              {moment(request.startDate).format("LL")}
            </td>
            <td className="px-4 py-2">
              {moment(request.endDate).format("LL")}
            </td>
            <td className="px-4 py-2">{request.workingDays}</td>
            <td className="px-4 py-2">{request.status}</td>
            <td className="px-4 py-2">
              {request.status === "Pending" ? (
                <>
                  {role === "admin" ? (
                    <>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-white hover:text-blue-500"
                        onClick={() =>
                          setStatusModals({
                            ...openStatusModals,
                            [request._id]: true,
                          })
                        }
                      >
                        Update status
                      </button>
                      {openStatusModals[request._id] ? (
                        <StatusModal
                          open={openStatusModals[request._id]}
                          setOpen={() =>
                            setStatusModals({
                              ...openStatusModals,
                              [request._id]: false,
                            })
                          }
                          request={request}
                        />
                      ) : null}
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-white hover:text-blue-500"
                        onClick={() =>
                          setOpenModals({ ...openModals, [request._id]: true })
                        }
                      >
                        Update
                      </button>
                      {openModals[request._id] ? (
                        <Modal
                          open={openModals[request._id]}
                          setOpen={() =>
                            setOpenModals({
                              ...openModals,
                              [request._id]: false,
                            })
                          }
                          request={request}
                        />
                      ) : null}
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-white hover:text-red-500"
                        onClick={() => deleteLeaveRequest(request._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaveList;
