import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import likeReducer from './likeReducer'
import addContetReducer from './addContentReducer'
import withdrawalReducer from './withdrawalReducer'
import showAllPosting from './showAllPosting';
import pickPosting from './pickPosting';
import searchReducer from './searchReducer'
import deleteMyPosting from './deleteMyPosting';
import kakaoReducer from './kakaoReducer'

const rootReducer = combineReducers({
  loginReducer,
  likeReducer,
  addContetReducer,
  withdrawalReducer,
  showAllPosting,
  pickPosting,
  searchReducer,
  deleteMyPosting,
  kakaoReducer,
})

export default rootReducer;