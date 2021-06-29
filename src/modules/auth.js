import axios from "axios";

/* 액션 타입 */
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN'; // 아이디 로그인

/* 액션생성 함수* */
export function loginUser(data) {
  // 서버에서 받은 data를 request에 저장
  const req = axios.post('http://54.180.151.176/user/login', data)
    .then(res => res.data);
  return {
      type: "LOCAL_LOGIN",
      payload: req
  }
}

/** 리듀서 선언 */
export default function auth(state = {}, action) {
  switch(action.type){
    case LOCAL_LOGIN:
      return {
        ...state,
        loginSuccess : action.payload,
      }
    default : return state;
  }
}