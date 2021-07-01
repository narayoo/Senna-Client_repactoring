import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

/** 액션타입 */
export const LIKE_BUTTON = 'LIKE_BUTTON';
export const UNLIKE_BUTTON = 'UNLIKE_BUTTON';



/** 액션생성함수 & API 요청 */
export const likeButton = (postingId) => async dispatch => {
    const userLikeButton = await axios.patch(`http://54.180.151.176/user/favorite/` , postingId );
    dispatch({type: LIKE_BUTTON ,userLikeButton});
  }
  export const unLikeButton = (postingId) => async dispatch => {
    const userUnLikeButton = await axios.delete(`http://54.180.151.176/user/favorite/` , postingId);
    dispatch({type: UNLIKE_BUTTON, userUnLikeButton});
  }


  const initialState = {
    like : false
  }


  export default function favoriteButtonReducer(state = initialState, action){
    console.log('action:::', state)
    switch(action.type) {
      case LIKE_BUTTON :
        return {
          like : true
        }
      case UNLIKE_BUTTON :
        return {
          like : false
            }
      default : return state;
    }
  }