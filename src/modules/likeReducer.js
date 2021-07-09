import axios from "axios";

/** 액션타입 */
export const LIKE_BUTTON = 'likeReducer/LIKE_BUTTON';
export const KAKAO_LIKEBUTTON = 'likeReducer/KAKAO_LIKEBUTTON'
/** 액션생성함수 & API 요청 */
export const likeButton = (postingId, id ) => async dispatch => {
  const userLikeButton = await axios.patch(`https://www.senna-server.shop/user/favorite/${id}` ,{postingId:postingId});
  dispatch({type: LIKE_BUTTON ,userLikeButton});
}

export const kakaoLikeButton = (postingId, kakaoId) => async dispatch => {
  const kakaoUserLikeButton = await axios.patch(`https://www.senna-server.shop/user/favorite/${kakaoId}` , {postingId:postingId});
  dispatch({type: KAKAO_LIKEBUTTON ,kakaoUserLikeButton})
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
      case KAKAO_LIKEBUTTON :
        return {
          ...state,
          like : true
        }

      
    default : return state;
  }
}