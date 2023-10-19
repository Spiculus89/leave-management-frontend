import axios from "axios";
import { uri } from "../../api/index";
import { toast } from "react-toastify";

export const register = (user) => {
  return () => {
    axios
      .post(`${uri}/user/register`, user)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message || err.response.data.errors[0]);
      });
  };
};

export const signIn = (creds) => {
  return (dispatch) => {
    axios
      .post(`${uri}/user/login`, creds)
      .then((res) => {
        dispatch({
          type: "SIGN_IN",
          token: res.data.token,
          user: res.data.user,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "SIGN_OUT",
    });
  };
};

export const clearAllAuth = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_ALL_AUTH",
    });
  };
};
