import axios from "axios";

export const ALL_OR_POSTING = 'showAllPosting/ALL_OR_POSTING';

export const getAllOfPosting = () => async dispatch => {
  const getAllPosting = await axios.get('https://www.senna-server.shop/post/all');
  dispatch({type: ALL_OR_POSTING,getAllPosting});
};

const initialState = {
  postingList: [],
};

export default function showAllPosting(state = initialState, action){
  switch(action.type) {
    case ALL_OR_POSTING :
      return {
        ...state,
        postingList : action.getAllPosting.data,
      }
    default : return state;
  }
}