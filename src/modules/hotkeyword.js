import axios from "axios";

export const HOT_KEYWORD = "hotkeyword/HOT_KEYWORD";

export const getHotKeyword = () => async dispatch => {
  const hotkeyword = await axios.get("https://www.senna-server.shop/search/hot");
  dispatch({type: HOT_KEYWORD, hotkeyword});
};

const initialState = {
  hot: "",
};

export default function hotkeywordReducer(state = initialState, action){
  switch(action.type) {
    case HOT_KEYWORD :
      return{
        ...state,
        hot : action.hotkeyword.data.keyword
      };
    default : return state;
  }
}