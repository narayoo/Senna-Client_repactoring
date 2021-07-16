import axios from "axios";

export const DELETE_MY_POSTING = 'deleteMyPosting/DELETE_MY_POSTING';
export const DELETE_KAKAO_MY_POSTING = 'deleteMyPosting/DELETE_KAKAO_MY_POSTING';

export const onDeleteMypost = (postingId) => async dispatch => {
  const deleteMypost = await axios.delete(`https://www.senna-server.shop/post/${postingId}`);
  dispatch({type: DELETE_MY_POSTING ,deleteMypost});
}
export const onDeleteKakaoMypost = (postingId) => async dispatch => {
  const deleteKakaoMypost = await axios.delete(`https://www.senna-server.shop/post/${postingId}`);
  dispatch({type: DELETE_KAKAO_MY_POSTING ,deleteKakaoMypost});
}

const initialState = {
  data: {
    status: true,
    postingId: null,
  }
}

export default function deleteMyPosting(state = initialState, action){
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