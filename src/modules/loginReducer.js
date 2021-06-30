import axios from "axios";

/** 액션타입 */
export const LOCAL_LOGIN = 'LOCAL_LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';

/** 액션생성함수 & API 요청 */
export const localLogin = (userId,password) => async dispatch => {
  const loginSuccess = await axios.post('http://54.180.151.176/user/login', userId,password);
  dispatch({type:LOCAL_LOGIN,loginSuccess});
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
            id: action.id,
            userKey: action.loginSuccess.data.data.userKey,
            accessToken: `Bearer ${action.loginSuccess.data.data.accessToken}`
          }
      }
    default : return state;
  }
}