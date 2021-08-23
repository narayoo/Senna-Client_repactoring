/* eslint-disable */

import React from "react";
import { darken, lighten } from "polished";
import Loading from "./Loading";
import styled from "styled-components";

const BackgroundDark = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.7);
  z-index: 3;
`;
const LoginModalDiv = styled.div`
  width: 400px;
  height: 400px;
  background-color: #ffffff;
  border: 1px solid gray;
  padding: 1.5rem;
  border-radius: 15px;
  @media all and (max-width:767px) {
    width: 100%;
    height: 100%;
    padding: 2rem;
  }
  @media all and (min-width:768px) and (max-width:1023px) { 
    width: 500px;
    height: 500px;
    padding: 2rem;
  }
`;
const ButtonGroup = styled.div`
  justify-content: center;
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  @media all and (max-width:767px) {
    flex-wrap: nowrap;
    flex-direction: column;
    margin-top: 5rem;
  }
  @media all and (min-width:768px) and (max-width:1023px) { 
    flex-wrap: nowrap;
    flex-direction: column;
    margin-top: 3rem;
  }
`;
const CancleBtn = styled.button`
  flex-grow: 1;
  width: 40%;
  height: 40px;
  color: #f5f5f5;
  margin: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: #707070;
  font-weight: bold;
  &:hover{
    cursor: pointer;
    background: ${darken(0.1, "#707070")};
  }
  @media all and (max-width:767px) {
    flex-grow: 0;
    margin: 0;
    width: 100%;
  }
  @media all and (min-width:768px) and (max-width:1023px) { 
    flex-grow: 0;
    margin: 0;
    width: 100%;
  }
`;
const LoginBtn = styled.button`
  flex-grow: 1;
  width: 40%;
  height: 40px;
  color: #f5f5f5; 
  margin: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: #00acc1;
  font-weight: bold;
  &:hover{
    cursor: pointer;
    background: ${lighten(0.1, "#00acc1")};
  }
  @media all and (max-width:767px) {
    flex-grow: 0;
    margin: 0;
    margin-top: 1.5rem;
    width: 100%;
  }
  @media all and (min-width:768px) and (max-width:1023px) { 
    flex-grow: 0;
    margin: 0;
    margin-top: 1.5rem;
    width: 100%;
  }
`;
const SocialBtn = styled.button`
  flex-grow: 2;
  width: 100%;
  height: 40px;
  color: #1b1b1b; 
  margin: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: #fef01b;
  font-weight: bold;
  &:hover{
    cursor: pointer;
    background: ${darken(0.1, "#fef01b")};
  }
  @media all and (max-width:767px) {
    flex-grow: 0;
    margin: 0;
    margin-top: 1.5rem;
  }
  @media all and (min-width:768px) and (max-width:1023px) { 
    flex-grow: 0;
    margin: 0;
    margin-top: 1.5rem;
  }
`;
const LoginInput = styled.input`
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  width: 70%;
  height: 30px;
  display: flex;
  margin: 0 auto;
  margin-top: 1rem;
  color: #1b1b1b;
  padding-left: 10px;
  &:focus {
  background: none;
  background-color: #ffffff;
  box-shadow: none;
  outline:none;
  }
  @media all and (max-width:767px) {
    width: 100%;
    height: 45px;
  }
  @media all and (min-width:768px) and (max-width:1023px) { 
    width: 80%;
    height: 38px;
    margin-top: 1.5rem;
  }
`;
const Title = styled.p`
  color: #424242;
  font-size: 1.4rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 3rem;
  @media all and (max-width:767px) {
    font-size: 2.5rem;
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
  @media all and (min-width:768px) and (max-width:1023px) { 
    font-size: 1.5rem;
  }
`;

const LoginModal = React.memo(({ loading, changePwd, changeId, userId, password, handleModalOff, visible, onConfirm, onCancle, onSocialLogin}) => {
  
  if (!visible) return null;

  return(
    <>
    {visible && (
      <BackgroundDark onClick={(e) => handleModalOff(e)}>
        <LoginModalDiv className='modal'>
          <Title>Login</Title>
          <LoginInput placeholder='Write your ID' name="userId" value={userId} onChange={changeId}/>
          <LoginInput type='password' placeholder='Write your Password' name='password' value={password} onChange={changePwd}/>
          <ButtonGroup>
            <CancleBtn onClick={onCancle}>Cancle</CancleBtn>
            <LoginBtn onClick={onConfirm}>
            {
            loading ? 
            <Loading /> : "Login"}
              </LoginBtn>
              <SocialBtn onClick={(e) => onSocialLogin(e)}>Kakao Login</SocialBtn>
          </ButtonGroup>
        </LoginModalDiv>
      </BackgroundDark>
    )}
    </>
  );
});
export default LoginModal;