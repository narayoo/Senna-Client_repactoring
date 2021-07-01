import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import Nav from './Nav'
import { addContent } from '../modules/addContentReducer';

const AddCtWrapper = styled.form`
  display: flex;
  flex-flow: row wrap;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 5rem;
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
  flex-direction: column;
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
  margin-bottom: 1rem;
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
  margin-top: 3rem;
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
const HashTagBox = styled.input`
  padding-left: 1rem;
  height: 10%;
  width: 80%;
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
const SaveBtn = styled.button`
  padding: 0.5rem;
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
function Addcontents() {

  const [ text, setText ] = useState('');
  const [ hash, setHash ] = useState([]);
  const [ photo, setPhoto ] = useState([]);
  const imgArr = [];

  // 캔슬 버튼 누를 시 새로고침을 위한 함수
  const cancle = () => {
    window.location.replace("/")
  }
  const onChangeText = (e) => {
    setText(e.target.value);
  }
  const onChangeHash = (e) => {
    setHash(e.target.value);
  }

  const handleFileOnChange1 = (e) => {
    let file = e.target.files[0];
    if(imgArr[0] === undefined && file !== undefined) { // 0번 자리가 비어있으면서, 새로들어온 파일이 사진이 있을때
      imgArr.push(file); // 배열에 넣어준다.
    }else if(imgArr[0] === undefined && file === undefined){ // 0번 자리가 비어있으면서, 새로 사진을 선택 안했을때 
      return imgArr;
    }else if(imgArr[0] !== undefined && file !== undefined) { // 0번 자리에 파일이 있으면서, 새로들어온 파일이 사진이 있을때
      imgArr.splice(0,1,file);
    }else { // 0번 자리에 파일이 있으면서, 새로운 사진 선택 안했을때,
      
    }
  }
  const handleFileOnChange2 = (e) => {
    let file = e.target.files[0];
    if(imgArr[1] === undefined) {
      imgArr.push(file);
    }else{
      if(file !== undefined){
        imgArr.splice(1,1,file);
      }
    }
  }
  const handleFileOnChange3 = (e) => {
    let file = e.target.files[0];
    if(imgArr[2] === undefined) {
      imgArr.push(file);
    }else{
      if(file !== undefined){
        imgArr.splice(2,1,file);
      }
    }
  }

  const onSave = (e) => {
    setPhoto([]);
    e.preventDefault();
    console.log('imgArr :::',imgArr);
    setPhoto(photo.concat(imgArr));
  }
  const onAddContent = (e) => {
    //dispatch(addContent(files));
    console.log('photo :::',photo);
  }
  
  
  
  return (
    <>
    <Nav />
      <AddCtWrapper>
        <AddCtFileSection>
          <AddFile type='file' className='img' name='images' accept='image/*' onChange={handleFileOnChange1}></AddFile>
          <AddFile type='file' className='img' name='images' accept='image/*' onChange={handleFileOnChange2}></AddFile>
          <AddFile type='file' className='img' name='images' accept='image/*' onChange={handleFileOnChange3}></AddFile>
         {/*  <AddFile type='file' className='img' name='images' accept='image/*' onChange={handleFileOnChange4}></AddFile>
          <AddFile type='file' className='img' name='images' accept='image/*' onChange={handleFileOnChange5}></AddFile> */}
          <SaveBtn onClick={(e) => onSave(e)}>SAVE</SaveBtn>
        </AddCtFileSection>
        <AddCtSection>
          <AddCtText placeholder='Write Your Memories' value={text} onChange={onChangeText}/>
          <HashTagBox placeholder='ex) #Korea #Seoul' value={hash} onChange={onChangeHash}/>
        </AddCtSection>
        <ButtonGroup>
          <Link to='./'>
            <CancleBtn onClick={() => cancle()}>Cancle</CancleBtn>
          </Link>
          <Link to='./'>
            <SubmitBtn type='submit' onClick={() => onAddContent()}>Submit</SubmitBtn>
          </Link>
        </ButtonGroup>
      </AddCtWrapper>
    </>
  );
}


export default Addcontents;

