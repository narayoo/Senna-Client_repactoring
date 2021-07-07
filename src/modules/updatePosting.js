import axios from "axios";

/** 액션타입 */
export const UPDATE_POSTING = 'updatePosting/UPDATE_POSTING';
/** 액션생성함수 & API 요청 */
export const onUpdatePosting = (userId,images,content,hashtag,id) => async dispatch => {
  console.log('userId:',userId)
  console.log('images:',images)
  console.log('content:',content)
  console.log('hashtag:',hashtag)
  console.log('id:',id)
  let formData = new FormData()
  const config = {
    header: {'content-type': 'multipart/form-data'}
  }
  for (let i=0; i < images.length; i++){
    formData.append('images', images[i]);
  }
  formData.append("hashtag", hashtag);
  formData.append("content", content);
  formData.append("userId", userId);
  const updatePostingInfo = await axios.patch(`http://54.180.151.176/post/m/${id}`, formData, config);
  dispatch({type: UPDATE_POSTING, updatePostingInfo});
}
const initialState = {
  data: {
    postingId: '', 
    userId: '', 
    image: [], 
    content: '',
    likes: 0,
    hashtag: [],
    created_date: Date,
    status: true,
  }
}

export default function updatePosting(state = initialState, action){
  console.log('updatePosting Action::',action)
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
      }
    default : return state;
  }
}