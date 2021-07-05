import axios from "axios";


export const KAKAO_LOGIN = 'kakaoReducer/KAKAO_LOGIN';

export const kakaoLogin = (code) => async dispatch => {
    const kakaoLoginSuccess = await axios.get(`http://3.35.208.142/oauth/callback/kakao?code=${code}`,)
    dispatch({type:KAKAO_LOGIN, kakaoLoginSuccess})
}


const initialState = {
    login : {
        userId: '',
        isLogin: false,
        userKey : '',
        accessToken : '',
        profileImg: '',
        favorite: [],
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
            }
        }
        default : return state;
    }
}

