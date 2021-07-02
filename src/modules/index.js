import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import favoriteButtonReducer from './favoriteButtonReducer'
import addContetReducer from './addContentReducer'
import withdrawalReducer from './withdrawalReducer'
import showAllPosting from './showAllPosting';
import pickPosting from './pickPosting';

const rootReducer = combineReducers({
  loginReducer,
  favoriteButtonReducer,
  addContetReducer,
  withdrawalReducer,
  showAllPosting,
  pickPosting,
})

export default rootReducer;