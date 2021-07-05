import axios from "axios";

/** 액션타입 */
export const SEARCH_CONTENT = 'searchReducer/SEARCH_CONTENT';

/** 액션생성함수 & API 요청 */
export const searchContent = (word) => async dispatch => {
  const searchContent = await axios.get(`http://54.180.151.176/get/search?sch=${word}`, {sch : word} );
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
      {
        const {value} = action
        
      }
    default : return state;
  }
}