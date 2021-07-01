import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import favoriteButtonReducer from './favoriteButtonReducer'
import addContetReducer from './addContentReducer'
import withdrawalReducer from './withdrawalReducer'

const rootReducer = combineReducers({
  loginReducer,
  favoriteButtonReducer,
  addContetReducer,
  withdrawalReducer
})

export default rootReducer;