import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import login from "./login";
import like from "./like";
import addContet from "./addContent";
import withdrawal from "./withdrawal";
import showAllPosting from "./showAllPosting";
import pickPosting from "./pickPosting";
import search from "./search";
import deleteMyPosting from "./deleteMyPosting";
import kakao from "./kakao";
import updateProfile from "./updateProfile";
import hotkeyword from "./hotkeyword";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login", "kakao"]
};

const rootReducer = combineReducers({
  login,
  like,
  addContet,
  withdrawal,
  showAllPosting,
  pickPosting,
  search,
  deleteMyPosting,
  kakao,
  updateProfile,
  hotkeyword,
});

export default persistReducer(persistConfig, rootReducer);