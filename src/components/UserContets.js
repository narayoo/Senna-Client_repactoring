import React, {useState, useEffect }from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import UserText from './UserText'
import UserFavorite from './UserFavorite'



const UserContentsBox = styled.div`
  width: 1280px;
  height: 800px;
  background-color: white;
  display: flex;
  flex-direction: column;

`

const UserTextBox = styled.div`
  margin-top: 10px;
  width: 1260px;
  height: 380px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: tomato;
`

const UserFavoriteBox = styled.div`
  margin-top: 10px;
  width: 1260px;
  height: 380px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: skyblue;
`


function UserContents({}) {
    return (
      <>
       <UserContentsBox>
           <UserTextBox>
             <UserText />    
           </UserTextBox >
           <UserFavoriteBox>
               <UserFavorite />
           </UserFavoriteBox>
           </UserContentsBox>
      </>
    )
  }
  


export default UserContents