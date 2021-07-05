import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import likeReducer from './likeReducer'
import addContetReducer from './addContentReducer'
import withdrawalReducer from './withdrawalReducer'
import showAllPosting from './showAllPosting';
import pickPosting from './pickPosting';
import searchReducer from './searchReducer'

const rootReducer = combineReducers({
  loginReducer,
  likeReducer,
  addContetReducer,
  withdrawalReducer,
  showAllPosting,
  pickPosting,
  searchReducer
})

export default rootReducer;