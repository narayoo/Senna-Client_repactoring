import React from 'react'
import styled from 'styled-components';

const UserProfileBox = styled.div`
  width: 400px;
  height: 800px;
  background-color: yellowgreen;
  display: flex;
  flex-direction: column;
`



const UserImage = styled.div`
  margin-top: 10px;
  margin-left: 80px;
  margin-bottom: 100px;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: blue;
  justify-content: center;
  

`

const UpdateInfoButton = styled.button`
  width: 200px;
  margin-left: 80px;
  background:#5a5a5a;
  color:#dcdcdc;
  border:none;
  position:relative;
  height:45px;
  font-size:1.6em;
  padding:0 2em;
  cursor:pointer;
  transition:800ms ease all;
  outline:none;
  


&:hover{
  background:#dcdcdc;
  color:#5a5a5a;
}
&:before,&:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background: #5a5a5a;
  transition:400ms ease all;
}
&:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
&:hover:before,&:hover:after{
  width:100%;
  transition:800ms ease all;
}

`

const WithdrawalButton = styled.button`
  width: 200px;
  margin-top: 300px;
  margin-left: 80px;
  background:#5a5a5a;
  color:#dcdcdc;
  border:none;
  position:relative;
  height:45px;
  font-size:1.6em;
  padding:0 2em;
  cursor:pointer;
  transition:800ms ease all;
  outline:none;
  



&:hover{
  background:#dcdcdc;
  color:#5a5a5a;
}
&:before,&:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background: #5a5a5a;
  transition:400ms ease all;
}
&:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
&:hover:before,&:hover:after{
  width:100%;
  transition:800ms ease all;
}
`

function UserInfo({}) {
    return (
      <>
        <UserProfileBox>
        <UserImage /> 
          <UpdateInfoButton />
          <WithdrawalButton />
       </UserProfileBox>
       </>
    )
  }

  export default UserInfo
