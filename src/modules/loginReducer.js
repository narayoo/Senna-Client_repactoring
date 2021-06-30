import axios from "axios";

/** 액션타입 */
export const LOCAL_LOGIN = 'LOCAL_LOGIN';
export const LOCAL_LOGOUT = 'LOCAL_LOGOUT';

/** 액션생성함수 & API 요청 */
export const localLogin = (userId,password) => async dispatch => {
  const loginSuccess = await axios.post('http://54.180.151.176/user/login', userId,password);
  dispatch({type:LOCAL_LOGIN,loginSuccess});
}
export const localLogout = (accessToken) => async dispatch => {
  const logoutSuccess = await axios.get('http://54.180.151.176/user/logout',
  { headers : { 
    authorization : accessToken ,
    'Content-Type': 'application/json',
    withCredentials: true 
    } 
  });
  dispatch({type:LOCAL_LOGOUT, logoutSuccess});
}
  
const initialState = {
  login : {
    isLogin: false,
    userKey : '',
    accessToken : '',
  }
}

export default function loginReducer(state = initialState, action){
  console.log('action:::',action.loginSuccess)
  switch(action.type) {
    case LOCAL_LOGIN :
      return {
        ...state,
          login: {
            isLogin: true,
            userKey: action.loginSuccess.data.userKey,
            accessToken: `Bearer ${action.loginSuccess.data.accessToken}`
          }
      }
    case LOCAL_LOGOUT :
      return {
        ...state,
          login: {
            isLogin: false,
            userKey: null,
            accessToken: null,
          }
      }
    default : return state;
  }
}