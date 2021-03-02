import axios from "../../axios";
import { loginSuccess } from "./login";

export const REGISTER_USER_START = "REGISTER_USER_START";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";

export const REGISTER_USER_RESET = "REGISTER_USER_RESET";

export const registerUserStart = () => ({
  type: REGISTER_USER_START,
});

export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  user,
});

export const registerUserFail = (error) => ({
  type: REGISTER_USER_FAIL,
  error,
});

export const registerUserReset = () => ({
  type: REGISTER_USER_RESET,
});

export function registerUser(user) {
  return async (dispatch) => {
    try {
      dispatch(registerUserStart());
      console.log(user);
      const response = await axios.post("/api/users/register", user);
      localStorage.setItem("token", response.data.token);
      dispatch(registerUserSuccess(response.data));
      dispatch(loginSuccess(response.data));
    } catch (error) {
      if (error.response.data.errors) {
        dispatch(registerUserFail(error.response.data.errors));
      } else {
        dispatch(registerUserFail("Server error"));
      }
    }
  };
}
