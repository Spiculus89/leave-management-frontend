import { toast } from "react-toastify";

const initialState = {
  token: sessionStorage.getItem("token"),
  email: null,
  _id: null,
  role: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
    case "SIGN_UP":
      toast.success(`Welcome ${action.user.email.split("@")[0]}!`);
      return {
        ...state,
        token: action.token,
        username: action.user.username,
        email: action.user.email,
        _id: action.user._id,
        role: action.user.role,
      };
    case "SIGN_OUT":
      return {
        token: null,
        username: null,
        email: null,
        _id: null,
        role: null,
      };
    case "CLEAR_ALL_AUTH":
      return {
        token: null,
        username: null,
        email: null,
        _id: null,
        role: null,
      };
    default:
      return state;
  }
};

export default authReducer;
