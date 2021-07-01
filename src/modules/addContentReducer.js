import axios from "axios";

/** 액션타입 */
export const ADD_CONTENT = 'ADD_CONTENT';


export const addContent = (hashtag,content,userId,images) => async dispatch => {
  let formData = new FormData()
  const config = {
        header: {'content-type': 'multipart/form-data'}
      }
    formData.append("hashtag", hashtag);
    formData.append("content", content);
    formData.append("userId", userId);
    formData.append("images", images);
    
    const userAddContent = await axios.post('http://54.180.151.176/post/upload', formData, config)
    dispatch({type:ADD_CONTENT, userAddContent })
}

const initialState = {
  userId : '',
}


export default function addContentReducer(state = initialState, action){
  console.log('action:::',action.loginSuccess)
  switch(action.type) {
    case ADD_CONTENT :
      return {
        ...state,
        userId : action.userAddContent,
      }
    default : return state;
  }
}