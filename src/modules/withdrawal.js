import axios from "axios";

export const USER_WITHDRAWAL = "withdrawal/USER_WITHDRAWAL";
export const KAKAO_USER_WITHDRAWAL = "withdrawal/KAKAO_USER_WITHDRAWAL";

export const withdrawal = (id) => async dispatch => {
    const password = prompt("비밀번호를 입력하세요", "");
    const withdrawalSuccess = await axios.delete(`https://www.senna-server.shop/user/${id}`, {data: {password}});
    dispatch({type:USER_WITHDRAWAL,withdrawalSuccess});
};
export const kakaoUserWithdrawal = (id) => async dispatch => {
  const kakaoUserWithdrawalSuccess = await axios.delete(`https://www.senna-server.shop/oauth/${id}`);
  dispatch({type:KAKAO_USER_WITHDRAWAL,kakaoUserWithdrawalSuccess});
};

const initialState = {
  user : {
    id: "",
    userId: "",
    password:"",
    profileImg: "",
    favorite: [],
    status: true
  },
};
  
export default function withdrawalReducer(state = initialState, action){
  switch(action.type) {
    case USER_WITHDRAWAL :
      return {
        ...state,
        user : {
          id: null,
          userId: null,
          password:null,
          profileImg: null,
          favorite: null,
          status: false
        }
      };
      case KAKAO_USER_WITHDRAWAL :
        return {
          ...state,
          user : {
            id: null,
            userId: null,
            profileImg: null,
            favorite: null,
            status: false
          }
        };

    default : return state;
  }
}
  
  