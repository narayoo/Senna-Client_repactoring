import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { isId, isPassword } from '../js/regExp';
import styled from 'styled-components';
import userImg from '../img/userImg.png';
import photo from '../img/signPhoto2.jpeg';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
`
const SignupContainer = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 100%;
`;
const Title = styled.p`
  margin-bottom: 4rem;
  font-size: 40px;
`;
// 이미지 wrapper
const ProfileCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  box-shadow: 8px 8px 8px 8px rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FileWrapper = styled.label`
  display: flex;
  width: 150px;
  height: 25px;
  font-size: 11px;
  text-align: center;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-bottom: 1rem;
  &:hover{
    color: #fff;
    transform: translateY(-7px);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const ProfileInput = styled.input`
  position: absolute; 
  width: 1px; 
  height: 1px; 
  padding: 0; 
  margin: -1px; 
  overflow: hidden; 
  clip:rect(0,0,0,0); 
  border: 0;
`;
const SignupInput = styled.input`
  max-width: 300px;
  min-width: 250px;
  margin-top: 15px;
  width: 30%;
  height: 35px;
  border: none;
  padding-left: 10px;
  box-shadow: 8px 8px 8px 5px rgba(0,0,0,0.6);
  color: #1b1b1b;
  &:focus{
    outline: none;
  }
`;
const SignupIdInput = styled.input`
  max-width: 300px;
  margin-top: 15px;
  margin-right: 1rem;
  width: 100%;
  height: 35px;
  border: none;
  padding-left: 10px;
  box-shadow: 8px 8px 8px 5px rgba(0,0,0,0.6);
  color: #1b1b1b;
  &:focus{
    outline: none;
  }
`;
const PhotoSection = styled.div`
  height: 100vh;
`;
const Photo = styled.img`
  max-height: 100%;
  width: auto;

`;
const ButtonGroup = styled.section`
  width: 100%;
  text-align: right;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
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
  margin-right: 2rem;
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
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-left: 1rem;
  &:hover{
    background-color: #00acc1;
    box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;
const IdCheckBtn = styled.button`
  margin-top: 15px;
  width: 30%;
  height: 35px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.1);
  color: #eeeeee;
  border: 1px solid #eeeeee;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: none;
  &:hover{
    color: #000;
    background-color: #fff;
  }
`;
const IdSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
  max-width: 300px;
  min-width: 250px;
`;

export default function SignUp() {

  const [previewURL, setPreviewURL] = useState('');
  const [img, setImg] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isValidId , setValidId ] = useState(false);
  const [isValidPassword , setIsValidPassword ] = useState(false);
  const [isPwdDoubleCk , setIsPwdDoubleCk ] = useState(false);
  const [checkId, setCheckId] = useState(false);

  // 유저 이미지 미리보기 적용 함수
  const handleFileOnChange = async (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setImg(file)
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file)
  } 
  // 유저 이미지 미리보기 적용 조건문
  let profile_preview = null;
  if(img !== ''){
    profile_preview = <img className='profile_preview' src={previewURL}></img>
  }else{
    profile_preview = <img className='profile_preview' src={userImg}></img>
  }
  // 캔슬 버튼 누를 시 새로고침을 위한 함수
  const cancle = () => {
    window.location.replace("/")
  }
  const onChangeId = (e) => {
    setUserId(e.target.value);
    if (!isId(e.target.value)) { 
      setValidId(false);
    } else if(e.target.value === ''){
      setValidId(false);
    } else { // 이메일 형식 통과 했을때
      setValidId(true);
    }
  }
  const onChangePwd = (e) => {
    setPassword(e.target.value);
    // 비밀번호 형식 안맞을 때
    if (!isPassword(e.target.value)) { 
      setIsValidPassword(false);
    } else { // 비밀번호 형식 통과 했을때
      setIsValidPassword(true);
    }
  }
  const onChangeCheckPwd = (e) => {
    setCheckPassword(e.target.value);
    if (password.length < 1 || e.target.value.length < 1) {
      setIsPwdDoubleCk(false);
      // 비밀번호가 같다면 일치
    }else if (password === e.target.value) {
      setIsPwdDoubleCk(true);
      // 비밀번호가 같지 않다면 불일치
    } else {
      setIsPwdDoubleCk(false);
    }
  }
  // submit 버튼 클릭 함수
  let history = useHistory();
  const submit = async (e) => {
    e.preventDefault();
    if(!isValidId){
      alert('아이디를 다시 확인해주세요.')
    }else if(!isValidPassword) {
      alert('비밀번호를 다시 확인해주세요.')
    }else if(!isPwdDoubleCk) {
      alert('비밀번호가 서로 일치하지 않습니다.')
    }else if(!checkId) {
      alert('아이디 중복확인을 해주세요.')
    }else if(isValidId && isValidPassword && isPwdDoubleCk && checkId){
      let formData = new FormData();
      const config = {
        header: {'content-type': 'multipart/form-data'}
      }
      formData.append("avatar", img);
      formData.append("userId", userId);
      formData.append("password", password);
      await axios.post('http://54.180.151.176/user/signup',
      formData, config)
      .then(res => {
        alert('회원가입이 완료되었습니다');
        history.push('./'); // 메인 페이지로 리다이렉션
        window.location.replace('./')
      }).catch(err => {
        console.log(err)
      })
    }
  }
  // 아이디 중복 확인 함수
  const doubleCheckId = async(e) => {
    e.preventDefault()
    const id = { id : userId}
    await axios.post('http://54.180.151.176/user/checkid',id)
    .then(res => {
      if(userId !== ''){
        console.log(res)
        setCheckId(true)
        alert('사용할 수 있는 아이디입니다.')
      }else{
        alert('아이디를 입력해주세요.')
      }
    }).catch(err => {
      console.log(err)
      alert('이미 존재하는 아이디입니다.')
    })
  }

  return (
    <>
    <Wrapper> 
      <PhotoSection>
        <Photo src={photo} />
      </PhotoSection>
      <SignupContainer>
        <Title>JOIN SENNA</Title>
        <ProfileCircle>
          {profile_preview}
        </ProfileCircle>
        <FileWrapper htmlFor='ex_filename'>Image Upload</FileWrapper>
        <ProfileInput id='ex_filename' type='file' name='avatar' accept='image/*' onChange={handleFileOnChange}/>
        <IdSection>
          <SignupIdInput value={userId} onChange={onChangeId} type='text' placeholder='ID (only letter and numbers)' />
          <IdCheckBtn onClick={(e) => doubleCheckId(e)} >Double check</IdCheckBtn>
        </IdSection>
        <SignupInput value={password} onChange={onChangePwd} type='password' placeholder='Password(min. 6 char)' />
        <SignupInput value={checkPassword} onChange={onChangeCheckPwd} type='password' placeholder='One more check Password' />
        <ButtonGroup>
          <Link to='./'>
            <CancleBtn onClick={() => cancle()}>Cancle</CancleBtn>
          </Link>
          <SubmitBtn onClick={(e) => submit(e)} type='submit'>Join</SubmitBtn>
        </ButtonGroup>
      </SignupContainer>
    </Wrapper>
    </>
  )
}

