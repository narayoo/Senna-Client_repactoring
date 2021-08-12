import axios from "axios";

export const LOCAL_LOGIN = "login/LOCAL_LOGIN";
export const LOCAL_LOGOUT = "login/LOCAL_LOGOUT";
export const USER_INFO = "login/USER_INFO";
export const REFRESH_LOGIN = "login/REFRESH_LOGIN";
export const AUTO_REFRESH_LOGIN = "login/AUTO_REFRESH_LOGIN";
export const ERROR = "login/ERROR";

export const localLogin = (body) => async dispatch => {
  try {
    const loginSuccess = await axios.post("https://www.senna-server.shop/user/login", body, { withCredentials:true });
    dispatch({type:LOCAL_LOGIN,loginSuccess});
  } catch(err) {
    alert(err.response.data);
  }
};
export const localLogout = (accessToken) => async dispatch => {
  const logoutSuccess = await axios.get("https://www.senna-server.shop/user/logout",
  { headers : { 
    authorization : accessToken ,
    "Content-Type": "application/json",
    },
    withCredentials: true 
  });
  dispatch({type:LOCAL_LOGOUT, logoutSuccess});
};
export const getUserInfo = (accessToken) =>  async dispatch => {
  const getInfoSuccess =  await axios.get("https://www.senna-server.shop/user/info",
  { headers : { 
    authorization : accessToken ,
    "Content-Type": "application/json",
    },
    withCredentials: true 
  });
  dispatch({type:USER_INFO, getInfoSuccess});
};
export const autoRefreshLogin = () => async dispatch => {
  const autoRefreshLogin = await axios.get("https://www.senna-server.shop/user/request-token", { withCredentials:true } );
  dispatch({type:AUTO_REFRESH_LOGIN, autoRefreshLogin});  
};

const initialState = {
  login : {
    userId: "",
    isLogin: false,
    userKey : "",
    accessToken : "",
    profileImg: "",
    favorite: [],
    suggest: "",
  },
  user : {
    id: "",
    userId: "",
    profileImg: "",
    favorite: [],
    uploadList: [],
  },
};

export default function loginReducer(state = initialState, action){
  switch(action.type) {
    case LOCAL_LOGIN :
      return {
        ...state,
          login: {
            userId: action.loginSuccess.data.userId,
            isLogin: true,
            userKey: action.loginSuccess.data.userKey,
            accessToken: `Bearer ${action.loginSuccess.data.accessToken}`,
            profileImg: action.loginSuccess.data.profileImg,
            favorite: action.loginSuccess.data.favorite,
            suggest: action.loginSuccess.data.keyword,
          },
      };
    case LOCAL_LOGOUT :
      return {
        ...state,
          login: {
            isLogin: false,
            userKey: null,
            accessToken: null,
          }
      };
    case USER_INFO :
      return {
        ...state,
        user : {
          id: action.getInfoSuccess.data.data._id,
          userId: action.getInfoSuccess.data.data.userId,
          profileImg: action.getInfoSuccess.data.data.profileImg,
          favorite: action.getInfoSuccess.data.data.favorite,
          uploadList: action.getInfoSuccess.data.data.uploadList,
        }
      };
    
        case AUTO_REFRESH_LOGIN :
        return {
          ...state,
            login: {
              userId: action.autoRefreshLogin.data.data.userId,
              isLogin: true,
              userKey: action.autoRefreshLogin.data.data._id,
              accessToken: `Bearer ${action.autoRefreshLogin.data.accessToken}`,
              profileImg: action.autoRefreshLogin.data.data.profileImg,
              favorite: action.autoRefreshLogin.data.data.favorite,
            },
        };
    default : return state;
  }
}


