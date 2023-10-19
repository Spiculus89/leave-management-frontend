const initialState = {
  leaves: [],
  report: [],
};

const leaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL":
      return {
        ...state,
        leaves: [...action.leaves],
      };
    case "CLEAR_ALL":
      return {
        ...state,
        leaves: [],
      };
    case "CREATE_NEW_LEAVE":
      return {
        ...state,
        leaves: [...state.leaves, action.leave],
      };
    case "DELETE_LEAVE":
      const newArr = state.leaves.filter((data) => data._id !== action.leaveId);
      return {
        ...state,
        leaves: [...newArr],
      };
    case "UPDATE_LEAVE":
      const updatedLeaves = state.leaves.map((leave) => {
        if (leave._id === action.leave._id) {
          return action.leave;
        } else {
          return leave;
        }
      });
      return {
        ...state,
        leaves: [...updatedLeaves],
      };
    case "GET_ALL_REQUESTS":
      return {
        ...state,
        leaves: [...action.leaves],
      };
    case "UPDATE_LEAVE_STATUS":
      const updatedStatusLeaves = state.leaves.map((leave) => {
        if (leave._id === action.leave._id) {
          return action.leave;
        } else {
          return leave;
        }
      });
      return {
        ...state,
        leaves: [...updatedStatusLeaves],
      };
    case "CREATE_LEAVE_REPORT":
      const dataArray = Object.entries(action.report).map(
        ([username, leaves]) => ({
          username,
          leaves: leaves.leaves,
        })
      );
      return {
        ...state,
        report: [...dataArray],
      };
    default:
      return state;
  }
};

export default leaveReducer;
