import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_RESET,
  GET_AUTHED_USER_FAIL,
  GET_AUTHED_USER_SUCCESS,
} from "../actions/login";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  error: null,
  errorGetAuthed: null,
  loading: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        error: null,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case LOGIN_RESET:
      return initialState;
    case GET_AUTHED_USER_FAIL:
      return {
        ...state,
        errorGetAuthed: action.error,
      };
    case GET_AUTHED_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default login;
