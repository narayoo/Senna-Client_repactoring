import axios from "axios";

/** 액션타입 */
export const DELETE_MY_POSTING = 'deleteMyPosting/DELETE_MY_POSTING';
export const DELETE_KAKAO_MY_POSTING = 'deleteMyPosting/DELETE_KAKAO_MY_POSTING';
/** 액션생성함수 & API 요청 */
export const onDeleteMypost = (postingId) => async dispatch => {
  const deleteMypost = await axios.delete(`http://54.180.151.176/post/d/${postingId}`);
  dispatch({type: DELETE_MY_POSTING ,deleteMypost});
}

export const onDeleteKakaoMypost = (postingId) => async dispatch => {
  const deleteKakaoMypost = await axios.delete(`http://54.180.151.176/post/d/${postingId}`);
  dispatch({type: DELETE_KAKAO_MY_POSTING ,deleteKakaoMypost});
}


const initialState = {
  data: {
    status: true,
    postingId: null,
  }
}


export default function deleteMyPosting(state = initialState, action){
  console.log('action', action)
  switch(action.type) {
    case DELETE_MY_POSTING :
      return {
        ...state,
        data : {
          status: false,
          postingId: action.deleteMypost.data.data.postingId,
        }
      }
      case DELETE_KAKAO_MY_POSTING :
        return {
          ...state,
          data : {
            status: false,
            postingId: action.deleteKakaoMypost.data.data.postingId,
          }
        }
    default : return state;
  }
}