import axios from "axios";

export const UPDATE_PROFILE = "updateProfile/UPDATE_PROFILE";
export const KAKAO_UPDATE_PROFILE = "updateProfile/KAKAO_UPDATE_PROFILE";

export const updateProfile = (id,profileImg,password) => async dispatch => {
  let formData = new FormData();
  const config = {
    header: {"content-type": "multipart/form-data"}
  };
  formData.append("profileImg", profileImg);
  formData.append("password", password);

  const updateProfile = await axios.patch(`https://www.senna-server.shop/user/profile/${id}`,formData, config);
  dispatch({type: UPDATE_PROFILE,updateProfile});
};
export const updateKakaoProfile = (id,profileImg) => async dispatch => {
  let formData = new FormData();
  const config = {
    header: {"content-type": "multipart/form-data"}
  };
  formData.append("profileImg", profileImg);

  const updateKakaoProfile = await axios.patch(`https://www.senna-server.shop/user/profile/${id}`,formData, config);
  dispatch({type: KAKAO_UPDATE_PROFILE,updateKakaoProfile});
};

const initialState = {
  profileImg: "",
  password: "",
};

export default function updateProfileReducer(state = initialState, action){
    switch(action.type) {
      case UPDATE_PROFILE :
        return{
          ...state,
          profileImg : action.updateProfile.profileImg,
          password : action.updateProfile.password
        };
        case KAKAO_UPDATE_PROFILE :
          return{
            ...state,
            profileImg : action.updateKakaoProfile.profileImg,
          };
      default : return state;
    }
  }