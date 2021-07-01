import axios from "axios";

/** 액션타입 */
export const ADD_CONTENT = 'ADD_CONTENT';


export const addContent = () => async dispatch => {
    let formdata = new FormData()
    const config = {
        header: {'content-type': 'multipart/form-data'}
      }
    formData.append("hashtag", hashtag);
    formData.append("content", content);
    formData.append("userId", userId);
    formData.append("image", image),   

  userAddContent = await axios.post('http://54.180.151.176/post/upload', formdata, config)
dispatch({type:ADD_CONTENT, userAddContent })

}


const initialState = {
    contents : {
        userId : '',
        content : '',
        image : '',
        hashtag : '',
    }
  }



export default function addContetsReducer(state = initialState, action){
    switch(action.type) {
      case ADD_CONTENT :
        console.log ('action', action.type)
        console.log ('userId', state.contents.userId)
        return {
            ...state,
            coontents: {
                userId : action.userAddContent.data,
                content : action.userAddContent.data,
                image : action.userAddContent.data,
                hashtag : action.userAddContent.data
              }
          
             }
            default : return state;      
         }
    }