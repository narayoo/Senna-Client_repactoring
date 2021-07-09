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

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ["loginReducer"]
  // blacklist -> 그것만 제외합니다
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
})

export default persistReducer(persistConfig, rootReducer);