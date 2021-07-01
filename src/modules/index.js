import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import addContentReducer from './addContentReducer';
import showAllPosting from './showAllPosting';

const rootReducer = combineReducers({
  loginReducer,
  addContentReducer,
  showAllPosting,
})

export default rootReducer;