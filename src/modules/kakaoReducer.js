import axios from "axios";

export const KAKAO_LOGIN = 'kakaoReducer/KAKAO_LOGIN';
export const KAKAO_LOGOUT = 'kakaoReducer/KAKAO_LOGOUT';
export const KAKAO_INFO = 'kakaoReducer/KAKAO_INFO';

export const kakaoLogin = (acToken) => async dispatch => {
  const kakaoLoginSuccess = await axios.get(`http://54.180.151.176/oauth/callback/kakao`,
  {headers : {authorization : acToken}})
  dispatch({type:KAKAO_LOGIN, kakaoLoginSuccess})
}
export const kakaoLogout = (kakaoAcToken, localAcToken ) => async dispatch => {
  const kakaoLogoutSuccess = await axios.get('http://54.180.151.176/user/logout',
  { headers : { 
    authorization : localAcToken ,
    kakaoKey: kakaoAcToken,
    'Content-Type': 'application/json',
    withCredentials: true 
    } 
  });
  dispatch({type:KAKAO_LOGOUT, kakaoLogoutSuccess})
}
export const getKakaoUserInfo = (accessToken) =>  async dispatch => {
  const getKakaoInfoSuccess =  await axios.get('http://54.180.151.176/user/info',
  { headers : { 
    authorization : accessToken ,
    'Content-Type': 'application/json',
    withCredentials: true 
    } 
  });
  dispatch({type:KAKAO_INFO, getKakaoInfoSuccess});
}

const initialState = {
  login : {
    userId: '',
    isLogin: false,
    userKey : '',
    accessToken : '',
    profileImg: '',
    favorite: [],
    localToken: '',
    uploadList: [],
  },
  user : {
    id: '',
    userId: '',
    profileImg: '',
    favorite: [],
    uploadList: [],
  },
}

export default function kakaoLoginReducer(state = initialState, action) {
    switch(action.type) {
        case KAKAO_LOGIN : 
        return {
          ...state,
          login: {
            userId: action.kakaoLoginSuccess.data.userId,
            isLogin: true,
            userKey: action.kakaoLoginSuccess.data.userKey,
            accessToken: `Bearer ${action.kakaoLoginSuccess.data.accessToken}`,
            profileImg: action.kakaoLoginSuccess.data.profileImg,
            favorite: action.kakaoLoginSuccess.data.favorite,
            localToken: action.kakaoLoginSuccess.data.localToken,
            uploadList: action.kakaoLoginSuccess.data.uploadList,
          }
        }
        case KAKAO_LOGOUT : 
        return {
          ...state,
          login: {
            userId: null,
            isLogin: false,
            userKey: null,
            accessToken: null,
            profileImg: null,
            favorite: [],
            localToken: null,
            uploadList:[],
          }
        }
        case KAKAO_INFO :
          return {
            ...state,
            user : {
              id: action.getKakaoInfoSuccess.data.data._id,
              userId: action.getKakaoInfoSuccess.data.data.userId,
              profileImg: action.getKakaoInfoSuccess.data.data.profileImg,
              favorite: action.getKakaoInfoSuccess.data.data.favorite,
              uploadList: action.getKakaoInfoSuccess.data.data.uploadList,
            }
          }
        default : return state;
    }
}

