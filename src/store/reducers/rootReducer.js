import { combineReducers } from "redux";
import authReducer from "./authReducer";
import leaveReducer from "./leaveReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  leaves: leaveReducer,
});

export default rootReducer;
