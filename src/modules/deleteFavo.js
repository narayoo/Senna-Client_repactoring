import axios from "axios";

/** 액션타입 */
export const DELETE_FAVO = 'deleteFavo/DELETE_FAVO';
/** 액션생성함수 & API 요청 */
export const onDeleteFavo = (postingId,id) => async dispatch => {
  const deleteFavoInfo = await axios.delete(`http://54.180.151.176/user/favorite/${id}` ,{data: {postingId:postingId}});
  dispatch({type: DELETE_FAVO, deleteFavoInfo});
}

const initialState = {
  favorite: []
}


export default function deleteFavo(state = initialState, action){
  console.log('deleteFavoInfo action', action)
  switch(action.type) {
    case DELETE_FAVO :
      return {
        ...state,
        favorite: action.deleteFavoInfo
      }
    default : return state;
  }
}