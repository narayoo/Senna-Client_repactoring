import axios from "axios";

/** 액션타입 */
export const UPDATE_PROFILE = 'updateProfileReducer/UPDATE_PROFILE';

/** 액션생성함수 & API 요청 */
export const updateProfile = (id,profileImg,password) => async dispatch => {
  let formData = new FormData()
  const config = {
    header: {'content-type': 'multipart/form-data'}
  }
  formData.append('profileImg', profileImg);
  formData.append("password", password);

  const updateProfile = await axios.patch(`http://54.180.151.176/user/profile/${id}`,formData, config);
  dispatch({type: UPDATE_PROFILE,updateProfile});
}


/** 초기상태 선언 */
const initialState = {
  profileImg: '',
  password: '',
}


export default function updateProfileReducer(state = initialState, action){
    switch(action.type) {
      case UPDATE_PROFILE :
        return{
          ...state,
          profileImg : action.updateProfile.profileImg,
          password : action.updateProfile.password
        }
      default : return state;
    }
  }