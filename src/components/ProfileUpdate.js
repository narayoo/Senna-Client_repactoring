import React from 'react';
import styled from 'styled-components';
import demo5 from '../img/demo5.jpg';
import MypageNav from '../components/MypageNav';


const UpdateUserBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  background-image: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5) ),url('https://images.unsplash.com/photo-1625153665957-4b9c0ec21166?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`
const UserNewImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 8px 8px 8px 8px rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`
const DemoImage = styled.img`
  width: 100%;
  height: auto;
`
const AddNewFile = styled.input`
  margin-top: 1.5rem;
  padding: 0.7rem;
  max-width: 300px;
  width: 30%;
  color: #1b1b1b;
  background: #eeeeee;
  font-size: 13px;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:hover{
    color: #fff;
    cursor: pointer;
    background: #494949;
  }
`;
  
const ChangeNewPasswords = styled.input`
  margin: 0 auto;
  margin-top: 1rem;
  width: 30%;
  max-width: 300px;
  height: 40px;
  border: none;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #1b1b1b;
  background: #eeeeee;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:focus{
    outline: none;
  }
`
const PrevPasswords = styled.input`
  margin: 0 auto;
  margin-top: 5rem;
  width: 30%;
  max-width: 300px;
  height: 40px;
  border: none;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #1b1b1b;
  background: #eeeeee;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:focus{
    outline: none;
  }
`;
const UpdateUserInfoComplete = styled.button`
  width: 100px;
  height: 37px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #eeeeee;
  background-color: #00acc1;
  border: none;
  box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
  cursor: pointer;
  outline: none;
  margin-left: 1rem;
  margin-top: 3rem;
  &:hover{
    color: #1b1b1b;
    background-color: #eeeeee;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    border: none;
  }
`

function ProfileUpdate () {
  return (
    <>
      <MypageNav />
      <UpdateUserBox>
        <UserNewImage>
          <DemoImage src={demo5} />
        </UserNewImage>
        <AddNewFile type='file'/>
        <PrevPasswords type='password' placeholder="기존 비밀번호" />
        <ChangeNewPasswords type='password' placeholder="새 비밀번호" />
        <ChangeNewPasswords type='password' placeholder="새 비밀번호 확인" />
        <UpdateUserInfoComplete type='submit'>Submit</UpdateUserInfoComplete>
      </UpdateUserBox>
    </> 
  )
         
}

export default ProfileUpdate;