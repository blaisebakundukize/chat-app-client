import { combineReducers } from "redux";
import login from "./login";
import registeredUser from "./registerUser";
import chat from "./chat";

export default combineReducers({
  auth: login,
  registeredUser,
  chat,
});
