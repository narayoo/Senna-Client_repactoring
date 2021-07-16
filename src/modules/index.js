import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginReducer from './loginReducer';
import likeReducer from './likeReducer';
import addContetReducer from './addContentReducer'
import withdrawalReducer from './withdrawalReducer'
import showAllPosting from './showAllPosting';
import pickPosting from './pickPosting';
import searchReducer from './searchReducer'
import deleteMyPosting from './deleteMyPosting';
import kakaoReducer from './kakaoReducer';
import updateProfileReducer from './updateProfileReducer';
import hotkeywordReducer from './hotkeywordReducer';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["loginReducer", "kakaoReducer"]
};

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
  updateProfileReducer,
  hotkeywordReducer,
})

export default persistReducer(persistConfig, rootReducer);