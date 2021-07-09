import axios from "axios";

/** 액션타입 */
export const ALL_OR_POSTING = 'showAllPosting/ALL_OR_POSTING';

/** 액션생성함수 & API 요청 */
export const getAllOfPosting = () => async dispatch => {
  const getAllPosting = await axios.get('https://www.senna-server.shop/post/all');
  dispatch({type: ALL_OR_POSTING,getAllPosting});
}
/** 초기상태 선언 */
const initialState = {
  data: [],
}

export default function showAllPosting(state = initialState, action){
  switch(action.type) {
    case ALL_OR_POSTING :
      return {
        ...state,
        data : action.getAllPosting.data,
      }
    default : return state;
  }
}