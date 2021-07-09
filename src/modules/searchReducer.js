import axios from "axios";

/** 액션타입 */
export const SEARCH_CONTENT = 'searchReducer/SEARCH_CONTENT';

/** 액션생성함수 & API 요청 */
export const searchContent = (searchinput) => async dispatch => {
  const searchContent = await axios.get(`https://www.senna-server.shop/search?sch=${searchinput}`,);
  dispatch({type: SEARCH_CONTENT,searchContent});
}
/** 초기상태 선언 */
const initialState = {
  value: '',
  data: [],
}

export default function showSearchContent(state = initialState, action){
  switch(action.type) {
    case SEARCH_CONTENT :
      return{
        ...state,
        word : action.searchContent.data.word,
        data : action.searchContent.data.data
      }
    default : return state;
  }
}