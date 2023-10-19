import axios from "axios";
import { uri } from "../../api";
import { toast } from "react-toastify";

export const getAll = (userId) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + sessionStorage.getItem("token");

  return (dispatch) => {
    axios
      .get(`${uri}/leave/leave-requests`, userId)
      .then(({ data }) => {
        dispatch({
          type: "GET_ALL",
          leaves: data,
        });
      })
      .catch((err) => toast.error(err.message));
  };
};

export const clearAll = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_ALL",
    });
  };
};

export const createNewLeave = (request) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + sessionStorage.getItem("token");
  return (dispatch) => {
    axios
      .post(`${uri}/leave/leave-request`, request)
      .then(({ data }) => {
        dispatch({
          type: "CREATE_NEW_LEAVE",
          leave: data,
        });
        toast.success("You have successfully created new leave request!");
      })
      .catch((err) => toast.error(err.message));
  };
};

export const deleteLeave = (leaveId) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + sessionStorage.getItem("token");
  return (dispatch) => {
    axios.delete(`${uri}/leave/leave-request/${leaveId}`).then(() => {
      toast.success("Request deleted!");
      dispatch({
        type: "DELETE_LEAVE",
        leaveId,
      });
    });
  };
};

export const updateLeave = (leaveId, data) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + sessionStorage.getItem("token");
  return (dispatch) => {
    axios
      .put(`${uri}/leave/leave-request/${leaveId}`, data)
      .then(({ data }) => {
        toast.success("Request updated!");
        dispatch({
          type: "UPDATE_LEAVE",
          leave: data,
        });
      });
  };
};

export const getAllRequests = () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + sessionStorage.getItem("token");

  return (dispatch) => {
    axios
      .get(`${uri}/admin/getall`)
      .then((res) => {
        dispatch({
          type: "GET_ALL_REQUESTS",
          leaves: res.data,
        });
        console.log(res);
      })
      .catch((err) => toast.error(err));
  };
};

export const updateLeaveStatus = (leaveId, data) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + sessionStorage.getItem("token");
  return (dispatch) => {
    axios.put(`${uri}/admin/update/${leaveId}`, data).then(({ data }) => {
      toast.success("Request updated!");
      dispatch({
        type: "UPDATE_LEAVE_STATUS",
        leave: data,
      });
    });
  };
};

export const createLeaveReport = (startDate, endDate, interval) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + sessionStorage.getItem("token");
  return (dispatch) => {
    axios
      .post(`${uri}/admin/create-report`, { startDate, endDate, interval })
      .then(({ data }) => {
        toast.success("Report created!");
        dispatch({
          type: "CREATE_LEAVE_REPORT",
          report: data,
        });
        console.log(data);
      })
      .catch((error) => {
        toast.error("Error creating report");
        console.log(error);
      });
  };
};
