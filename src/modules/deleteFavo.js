import axios from "axios";

export const DELETE_FAVO = "deleteFavo/DELETE_FAVO";
export const DELETE_KAKAO_FAVO ="deleteFavo/DELETE_KAKAO_FAVO";

export const onDeleteFavo = (postingId,id) => async dispatch => {
  const deleteFavoInfo = await axios.delete(`https://www.senna-server.shop/user/${id}/favorite` ,{data: {postingId:postingId}});
  dispatch({type: DELETE_FAVO, deleteFavoInfo});
};

export const onDeleteKakaoFavo = (postingId,id) => async dispatch => {
  const deleteKakaoFavoInfo = await axios.delete(`https://www.senna-server.shop/user/${id}/favorite` ,{data: {postingId:postingId}});
  dispatch({type: DELETE_KAKAO_FAVO, deleteKakaoFavoInfo});
};

const initialState = {
  favorite: []
};

export default function deleteFavo(state = initialState, action){
  switch(action.type) {
    case DELETE_FAVO :
      return {
        ...state,
        favorite: action.deleteFavoInfo
      };
      case DELETE_KAKAO_FAVO :
        return {
          ...state,
          favorite: action.deleteFavoInfo
        };
    default : return state;
  }
}