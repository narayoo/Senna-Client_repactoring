import React, {useState, useEffect }from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import demo5 from '../image/demo5.jpg';



const UpdateUserBox = styled.div`
   margin-top: 100px;
   margin-left: 50px;
   margin-bottom: 50px;
   width: 1680px;
   height: 800px;
   background-color: #1b1b1b;
   display: flex;
   flex-direction: column;
   justify-content: center;
`



const UserNewImage = styled.div`
  margin: 0 auto;
  margin-bottom: 3rem;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: blue;
  
`

const DemoImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
`


const AddNewFile = styled.input`
  padding: 1rem;
  margin: 0 auto;
  margin-bottom: 10rem;
  width: 200px;
  border: none;
  color: #1b1b1b;
  background: #eeeeee;
  transition: all 0.3s ease 0s;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:hover{
    color: #fff;
    cursor: pointer;
    background: #494949;
    transform: translateY(-7px);
  }
`;


const ChangeNewPasswords = styled.input`
  margin: 0 auto;
  width: 200px;
  height: 40px;
  border: none;
  margin-bottom: 10rem;
`


const UpdateUserInfoComplete = styled.button`
  margin: 0 auto;
  width: 200px;
  background:#5a5a5a;
  color:#dcdcdc;
  border:none;
  position:relative;
  height:45px;
  font-size:1em;
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


function ProfileUpdate () {
  return (
    <>
      <UpdateUserBox>
        <UserNewImage>
          <DemoImage src={demo5} />
        </UserNewImage>
        <AddNewFile type='file'/>
        <ChangeNewPasswords type='password' placeholder="새 비밀번호" />
        <UpdateUserInfoComplete type='submit'>편집 완료</UpdateUserInfoComplete>
      </UpdateUserBox>
    </> 
  )
         
}

export default ProfileUpdate;