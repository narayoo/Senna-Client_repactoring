import axios from "axios";

/** 액션타입 */
export const ADD_CONTENT = 'addComtentReducer/ADD_CONTENT';

export const addContent = (hashtag,content,userId,images) => async dispatch => {
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
  
  const userAddContent = await axios.post('http://54.180.151.176/post/upload', formData, config)
  dispatch({type:ADD_CONTENT, userAddContent })
}

const initialState = {
  content_data: {},
}

export default function addContentReducer(state = initialState, action){
  switch(action.type) {
    case ADD_CONTENT :
      return {
        ...state,
        content_data : action.userAddContent.data
      }
    default : return state;
  }

}