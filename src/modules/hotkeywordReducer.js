import axios from "axios";

/** 액션타입 */
export const HOY_KEYWORD = 'hotkeywordReducer/HOY_KEYWORD';

/** 액션생성함수 & API 요청 */
export const getHotKeyword = () => async dispatch => {
  const hotkeyword = await axios.get(`https://www.senna-server.shop/search/hot`);
  dispatch({type: HOY_KEYWORD, hotkeyword});
}
/** 초기상태 선언 */
const initialState = {
  hot: '',
}

export default function hotkeywordReducer(state = initialState, action){
  switch(action.type) {
    case HOY_KEYWORD :
      return{
        ...state,
        hot : action.hotkeyword
      }
    default : return state;
  }
}