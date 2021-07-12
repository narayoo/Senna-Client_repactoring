import axios from "axios";

/** 액션타입 */
export const HOT_KEYWORD = 'hotkeywordReducer/HOT_KEYWORD';

/** 액션생성함수 & API 요청 */
export const getHotKeyword = () => async dispatch => {
  const hotkeyword = await axios.get(`https://www.senna-server.shop/search/hot`);
  dispatch({type: HOT_KEYWORD, hotkeyword});
}
/** 초기상태 선언 */
const initialState = {
  hot: '',
}

export default function hotkeywordReducer(state = initialState, action){
  switch(action.type) {
    case HOT_KEYWORD :
      return{
        ...state,
        hot : action.hotkeyword.data.keyword
      }
    default : return state;
  }
}