import { combineReducers } from "redux";
import localLogin from './auth';

const rootReducer = combineReducers({
  // 리듀서 이름들 나열,,
  localLogin,
})

export default rootReducer;