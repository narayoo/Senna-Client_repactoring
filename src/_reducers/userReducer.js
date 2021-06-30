import { LOGIN_USER, LOGOUT_USER,DOUBLE_CHECK_ID } from "../_actions/type";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, success: action.payload };
    case LOGOUT_USER:
      return { ...state, success: action.payload };
    case DOUBLE_CHECK_ID:
      return { ...state, success: action.payload };
    default:
      return state;
  }
}