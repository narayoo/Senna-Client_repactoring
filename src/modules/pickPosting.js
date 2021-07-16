import axios from "axios";

export const PICK_POSTING = 'pickPosting/PICK_POSTING';

export const getPickPosting = (postingId) => async dispatch => {
  const getPosting = await axios.get(`https://www.senna-server.shop/post/${postingId}`);
  dispatch({type: PICK_POSTING,getPosting});
};

const initialState = {
  postInfo: {
    content: '',
    hashtag : [],
    image: [],
    postId: '',
    likeUser: [],
    place: ''
  },
}

export default function pickPosting(state = initialState, action){
  switch(action.type) {
    case PICK_POSTING :
      return {
        ...state,
        postInfo : {
          content: action.getPosting.data.data.content,
          hashtag: action.getPosting.data.data.hashtag,
          image: action.getPosting.data.data.image,
          postId: action.getPosting.data.data._id,
          likeUser: action.getPosting.data.data.likeUser,
          place: action.getPosting.data.data.place
        }
      }
    default : return state;
  }
}