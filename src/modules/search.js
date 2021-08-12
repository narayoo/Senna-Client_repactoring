import axios from "axios";

export const SEARCH_CONTENT = "search/SEARCH_CONTENT";

export const searchContent = (searchinput) => async dispatch => {
  const searchContent = await axios.get(`https://www.senna-server.shop/search?sch=${searchinput}`,);
  dispatch({type: SEARCH_CONTENT,searchContent});
};

const initialState = {
  value: "",
  data: [],
};

export default function showSearchContent(state = initialState, action){
  switch(action.type) {
    case SEARCH_CONTENT :
      return{
        ...state,
        word : action.searchContent.data.word,
        data : action.searchContent.data.data
      };
    default : return state;
  }
}