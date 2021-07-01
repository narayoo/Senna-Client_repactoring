import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import favoriteButtonReducer from './favoriteButtonReducer'
import addContetReducer from './addContentReducer'
import withdrawalReducer from './withdrawalReducer'
import addContentReducer from './addContentReducer';
import showAllPosting from './showAllPosting';

const rootReducer = combineReducers({
  loginReducer,
  favoriteButtonReducer,
  addContetReducer,
  withdrawalReducer,
  showAllPosting,
})

export default rootReducer;