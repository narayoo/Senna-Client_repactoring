import React from 'react'
import styled from 'styled-components';
import UserInfo from './UserInfo'
import UserContents from './UserContets'


const ProfileSection = styled.div`
   margin-top: 100px;
   margin-left: 50px;
   margin-bottom: 50px;
   width: 1680px;
   height: 800px;
   background-color: #1b1b1b;
   display: flex;
   flex-direction: row;
   justify-content: center;
`

/* // loading, sucess, error
function userProfile (state, action) {
  switch (action.type){
    case 'LOADING': 
      return {
        loading : true,
        data : null,
        error : null,
      }
    case 'SUCCESS':
      return {
        loading : false,
        data : action.data,
        error : null,
      }
    case 'ERROR':
      return {
        loading : false,
        data : null,
        error : action.error,
      }
    default :
     return state
  }
  
}


 */

function  Mypage () {

  // const [state, dispatch] = useReducer(userProfile , {
  //   loading : false,
  //   data: null,
  //   error: null
  // })

  // const fetchUserInfo = async () => {
  //   dispatch({type : 'LOADING'});
  //   try {
  //     const response = await axios.get(
  //       '/user/info'
  //     )
  //     dispatch({type : 'SUCCESS' , data : response.data});
  //   } catch (e) {
  //     dispatch({type : 'ERROR', error: e })
  //   }
  // }

  //  useEffect(() => {
  //   fetchUserInfo(); 
  // }, []);


  // const {loading, data, error } = state;
  // if(loading) return <div>로딩중</div>
  // if(error) return <div>에러가 발생했습니다.</div>
  // if(!data) return null;

  return (
    <>
  <ProfileSection>
  <UserInfo />
  <UserContents/>
  </ProfileSection>
  
    {/* <ul>
      {data.map(user => (
        <li key={user.id}>
          {user.user_id} 
          <img src= {user.profile_img} />
          </li>
      ))}
    </ul> */}
    </>
);
  
}


  export default Mypage;

