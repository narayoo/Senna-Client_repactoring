import axios from "axios";

/** 액션타입 */
export const LIKE_BUTTON = 'favoriteBittpmReducer/LIKE_BUTTON';
export const UNLIKE_BUTTON = 'favoriteBittpmReducer/UNLIKE_BUTTON';



/** 액션생성함수 & API 요청 */
export const likeButton = (id, postingId ) => async dispatch => {
    const userLikeButton = await axios.patch(`http://54.180.151.176/user/favorite/${id}` ,postingId);
    dispatch({type: LIKE_BUTTON ,userLikeButton});
  }
  export const unLikeButton = (id, postingId) => async dispatch => {
    const userUnLikeButton = await axios.delete(`http://54.180.151.176/user/favorite/${id}` ,postingId );
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