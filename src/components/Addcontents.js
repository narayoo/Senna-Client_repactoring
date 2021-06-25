import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Nav from './Nav'

const AddCtWrapper = styled.form`
  display: flex;
  flex-flow: row wrap;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 1.5rem;
`;
const AddCtFileSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  width: 50%;
`;
const AddCtSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`;
const AddFile = styled.input`
  padding: 1rem;
  margin: 1rem;
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
const AddCtText = styled.textarea`
  width: 80%;
  height: 80%;
  padding: 1rem;
  color: #1b1b1b;
  background: linear-gradient(#ffffff, #aeaeae);
  font-size: 17px;
  resize: none;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:focus{
    outline: none;
    background: #ffffff;
  }
`;
const ButtonGroup = styled.section`
  width: 100%;
  text-align: right;
  padding-right: 2rem;
`;
const CancleBtn = styled.button`
  width: 100px;
  height: 37px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #bdbdbd;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-bottom: 2rem;

  &:hover{
    background-color: #8d8d8d;
    box-shadow: 0px 15px 20px rgba(141, 141, 141, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;
const SubmitBtn = styled.button`
  width: 100px;
  height: 37px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-bottom: 2rem;
  margin-left: 1.3rem;

  &:hover{
    background-color: #00acc1;
    box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;
// 캔슬 버튼 누를 시 새로고침을 위한 함수
const cancle = () => {
  window.location.replace("/")
}
function Addcontents() {
  return (
    <>
    <Nav />
      <AddCtWrapper>
        <AddCtFileSection>
          <AddFile type='file'></AddFile>
          <AddFile type='file'></AddFile>
          <AddFile type='file'></AddFile>
          <AddFile type='file'></AddFile>
          <AddFile type='file'></AddFile>
        </AddCtFileSection>
        <AddCtSection>
          <AddCtText placeholder='Write Your Memories' />
        </AddCtSection>
        <ButtonGroup>
          <Link to='./'>
            <CancleBtn onClick={() => cancle()}>Cancle</CancleBtn>
          </Link>
          <Link to='./'>
            <SubmitBtn type='submit'>Submit</SubmitBtn>
          </Link>
        </ButtonGroup>
      </AddCtWrapper>
    </>
  );
}


export default Addcontents;

