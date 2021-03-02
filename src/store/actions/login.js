import axios from "../../axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_RESET = "LOGIN_RESET";

export const LOGOUT = "LOGOUT";
export const GET_AUTHED_USER_SUCCESS = "GET_AUTHED_USER_SUCCESS";
export const GET_AUTHED_USER_FAIL = "GET_AUTHED_USER_FAIL";

export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});

export const loginFail = (error) => ({
  type: LOGIN_FAIL,
  error,
});

export const LoginReset = () => ({
  type: LOGIN_RESET,
});

export const logout = () => ({
  type: LOGOUT,
});

export const getAuthedUserSuccess = (user) => ({
  type: GET_AUTHED_USER_SUCCESS,
  user,
});

export const getAuthedUserFail = (error) => ({
  type: GET_AUTHED_USER_FAIL,
  error,
});

export function login(username, password) {
  return async (dispatch) => {
    try {
      dispatch(loginStart());
      const response = await axios.post("/api/users/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      dispatch(loginSuccess(response.data));
    } catch (error) {
      if (error.response.data.message) {
        dispatch(loginFail(error.response.data.message));
      }
    }
  };
}

export function handleGetAuthedUser() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      dispatch(getAuthedUserSuccess(response.data));
    } catch (error) {
      console.log("axios response error", error.response.data);
      dispatch(getAuthedUserFail("User not Found"));
    }
  };
}
