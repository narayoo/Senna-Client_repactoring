import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import likeReducer from './likeReducer'
import addContetReducer from './addContentReducer'
import withdrawalReducer from './withdrawalReducer'
import showAllPosting from './showAllPosting';
import pickPosting from './pickPosting';
import deleteMyPosting from './deleteMyPosting';

const rootReducer = combineReducers({
  loginReducer,
  likeReducer,
  addContetReducer,
  withdrawalReducer,
  showAllPosting,
  pickPosting,
  deleteMyPosting,
})

export default rootReducer;