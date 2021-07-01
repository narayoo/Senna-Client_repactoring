import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import favoriteButtonReducer from './favoriteButtonReducer'
import addContetsReducer from './addPostingReducer'

const rootReducer = combineReducers({
  loginReducer,
  favoriteButtonReducer,
  addContetsReducer
})

export default rootReducer;