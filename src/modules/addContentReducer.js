import axios from "axios";

/** 액션타입 */
export const ADD_CONTENT = 'addComtentReducer/ADD_CONTENT';
export const KAKAO_ADD_CONTENT = 'addComtentReducer/KAKAO_ADD_CONTENT'

export const addContent = (hashtag,content,userId,images,place) => async dispatch => {
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
  formData.append("place", place);
  
  const userAddContent = await axios.post('https://www.senna-server.shop/post/upload', formData, config)
  dispatch({type:ADD_CONTENT, userAddContent })
}

export const kakaoAddContent = (hashtag,content,userId,images,place) => async dispatch => {
  console.log('플레이스나와', place)
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
  formData.append('place', place)
  
  const kakaoUserAddContent = await axios.post('https://www.senna-server.shop/post/upload', formData, config)
  dispatch({type:KAKAO_ADD_CONTENT, kakaoUserAddContent })
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
      case KAKAO_ADD_CONTENT :
        console.log('뭐가나올까유', action.kakaoUserAddContent.data)
        return {
          ...state,
          content_data : action.kakaoUserAddContent.data
        }
    default : return state;
  }

}