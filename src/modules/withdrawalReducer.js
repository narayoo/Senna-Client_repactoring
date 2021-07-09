import axios from "axios";


/** 액션타입 */
export const USER_WITHDRAWAL = 'withdrawalReducer/USER_WITHDRAWAL';

/** 액션생성함수 & API 요청 */
export const withdrawal = ( id) => async dispatch => {
    const password = prompt('비밀번호를 입력하세요', '');
    const withdrawalSuccess = await axios.patch(`https://www.senna-server.shop/user/d/${id}`, {password : password} );
    dispatch({type:USER_WITHDRAWAL,withdrawalSuccess});
  }
    
  const initialState = {
    user : {
      id: '',
      userId: '',
      password:'',
      profileImg: '',
      favorite: [],
      status: true
    },
    }
  
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
        }
      default : return state;
    }
  }
  
  