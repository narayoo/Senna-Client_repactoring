import axios from "axios";

export const UPDATE_POSTING = "updatePosting/UPDATE_POSTING";

export const onUpdatePosting = (userId,images,content,hashtag,id,place) => async dispatch => {
  let formData = new FormData();
  const config = {
    header: {"content-type": "multipart/form-data"}
  };
  for (let i=0; i < images.length; i++){
    formData.append("images", images[i]);
  }
  formData.append("hashtag", hashtag);
  formData.append("content", content);
  formData.append("userId", userId);
  formData.append("place", place);
  const updatePostingInfo = await axios.patch(`https://www.senna-server.shop/post/${id}`, formData, config);
  dispatch({type: UPDATE_POSTING, updatePostingInfo});
};
const initialState = {
  data: {
    postingId: "", 
    userId: "", 
    image: [], 
    content: "",
    likes: 0,
    hashtag: [],
    created_date: Date,
    status: true,
  }
};

export default function updatePosting(state = initialState, action){
  switch(action.type) {
    case UPDATE_POSTING :
      return {
        ...state,
        postingId: action.updatePostingInfo.data.data._id, 
        userId: action.updatePostingInfo.data.data.userId, 
        image: action.updatePostingInfo.data.data.image, 
        content: action.updatePostingInfo.data.data.content,
        likes: action.updatePostingInfo.data.data.likes,
        hashtag: action.updatePostingInfo.data.data.hashtag,
        created_date: action.updatePostingInfo.data.data.created_date,
        status: true,
        place : action.updatePostingInfo.data.data.place
      };
    default : return state;
  }
}