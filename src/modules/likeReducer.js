import axios from "axios";

/** 액션타입 */
export const LIKE_BUTTON = 'likeReducer/LIKE_BUTTON';
/** 액션생성함수 & API 요청 */
export const likeButton = (postingId, id ) => async dispatch => {
  const userLikeButton = await axios.patch(`http://54.180.151.176/user/favorite/${id}` ,{postingId:postingId});
  dispatch({type: LIKE_BUTTON ,userLikeButton});
}

const initialState = {
  like : false
}


export default function likeReducer(state = initialState, action){
  switch(action.type) {
    case LIKE_BUTTON :
      return {
        ...state,
        like : true
      }
    default : return state;
  }
}