import { combineReducers } from "redux";
import user from "./userReducer";

const rootReducer = combineReducers({
  // 리듀서 이름들 나열,,
  user,
});

export default rootReducer;