import { LOGIN_USER,LOGOUT_USER,DOUBLE_CHECK_ID } from "./type";
import { request } from "../utils/axios";

const USER_URL = "/user";

export function loginUser(userdata) {
  const data = request("post", USER_URL + "/login", userdata);
  return {
    type: LOGIN_USER,
    payload: data,
  };
}

export function logoutUser() {
  const data = request("get", USER_URL + "/logout");
  return {
    type: LOGOUT_USER,
    payload: data,
  };
}

export function onCheckId(id) {
  const data = request("post", USER_URL + "/checkid", id);
  return {
    type: DOUBLE_CHECK_ID,
    payload: data,
  };
}
