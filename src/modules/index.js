import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import addContentReducer from './addContentReducer';

const rootReducer = combineReducers({
  loginReducer,
  addContentReducer
})

export default rootReducer;