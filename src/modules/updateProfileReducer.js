import axios from "axios";

/** 액션타입 */
export const UPDATE_PROFILE = 'updateProfileReducer/UPDATE_PROFILE';
export const KAKAO_UPDATE_PROFILE = 'updateProfileReducer/KAKAO_UPDATE_PROFILE';

/** 액션생성함수 & API 요청 */
export const updateProfile = (id,profileImg,password) => async dispatch => {
  let formData = new FormData()
  const config = {
    header: {'content-type': 'multipart/form-data'}
  }
  formData.append('profileImg', profileImg);
  formData.append("password", password);

  const updateProfile = await axios.patch(`https://www.senna-server.shop/user/profile/${id}`,formData, config);
  dispatch({type: UPDATE_PROFILE,updateProfile});
}


export const updateKakaoProfile = (id,profileImg) => async dispatch => {
  console.log('소셜아이디가올까',id)
  console.log('프로필이미지가올까',profileImg)
  let formData = new FormData()
  const config = {
    header: {'content-type': 'multipart/form-data'}
  }
  formData.append('profileImg', profileImg);

  const updateKakaoProfile = await axios.patch(`https://www.senna-server.shop/user/profile/${id}`,formData, config);
  dispatch({type: KAKAO_UPDATE_PROFILE,updateKakaoProfile});
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
        case KAKAO_UPDATE_PROFILE :
          return{
            ...state,
            profileImg : action.updateKakaoProfile.profileImg,
          }
      default : return state;
    }
  }