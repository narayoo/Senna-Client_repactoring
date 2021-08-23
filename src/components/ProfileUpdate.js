import React, { useState } from "react";
import styled from "styled-components";
import userImg from "../img/userImg.png";
import MypageNav from "../components/MypageNav";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateProfile , updateKakaoProfile} from "../modules/updateProfile";
import { getUserInfo } from "../modules/login";
import { getKakaoUserInfo } from "../modules/kakao";

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
`;
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
  @media all and (max-width:767px) {
    width: 150px;
    height: 150px;
  }
`;
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
  @media all and (max-width:767px) {
    max-width: 500px;
    width: 60%;
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
  @media all and (max-width:767px) {
    max-width: 500px;
    width: 60%;
  }
`;
const ButtonGroup = styled.section`
  max-width: 800px;
  width: 80%;
  margin-top: 2rem;
  text-align: right;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media all and (max-width:767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
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
  margin-top: 0.5rem;
  &:hover{
    background-color: #8d8d8d;
    box-shadow: 0px 15px 20px rgba(141, 141, 141, 0.4);
    color: #fff;
    transform: translateY(-7px);
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
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  &:hover{
    color: #1b1b1b;
    background-color: #eeeeee;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    border: none;
  }
`;

const ProfileUpdate = () => {

  const [previewURL, setPreviewURL] = useState("");
  const [img, setImg] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useSelector(state => state.login.login.userKey);
  const accessToken = useSelector(state => state.login.login.accessToken);
  const isLogin = useSelector(state => state.login.login.isLogin);
  const kakaoIsLogin = useSelector(state => state.kakao.login.isLogin);
  const kakaoUserKey = useSelector(state => state.kakao.login.userKey);
  const kakaoAcToken = useSelector(state => state.kakao.login.accessToken);
 
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const updateProfileHandler = async() => {
      await dispatch(updateProfile(id,img,password));
      alert("프로필이 수정되었습니다.");
      history.push("/mypage");
      await dispatch(getUserInfo(accessToken)); 
  };
  
  const updateKakaoUserProfileHandler = async() => {
    await dispatch(updateKakaoProfile(kakaoUserKey,img));
    alert("프로필이 수정되었습니다.");
    history.push("/mypage");
    await dispatch(getKakaoUserInfo(kakaoAcToken));
  };

  const handleFileOnChange = async (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setImg(file);
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const cancle = () => {
    window.location.replace("/mypage");
  };

  let profile_preview = null;

  if(img !== ""){
    profile_preview = <img className='profile_preview' src={previewURL}></img>;
  }else{
    profile_preview = <img className='profile_preview' src={userImg}></img>;
  }
  
  return (
    <>
      <MypageNav />
      <UpdateUserBox>
         {(()=> {
              if(isLogin){
                return (
                  <>
                  <UserNewImage>
                 {profile_preview}
                 </UserNewImage>
                 <AddNewFile type='file' className='img' name='profileImg' accept='image/*' onChange={handleFileOnChange} />
                 <ChangeNewPasswords type='password' placeholder="새 비밀번호" value={password} onChange={onChangePassword}/>
                 <ChangeNewPasswords type='password' placeholder="새 비밀번호 확인" />
                 <ButtonGroup>
                 <CancleBtn onClick={() => cancle()}>Cancle</CancleBtn> 
                 <UpdateUserInfoComplete type='submit' onClick={updateProfileHandler}>Submit</UpdateUserInfoComplete>
                 </ButtonGroup>
                 </>
                );
              } else if (kakaoIsLogin){
                return (
                <>
                 <UserNewImage>
                 {profile_preview}
                 </UserNewImage>
                 <AddNewFile type='file' className='img' name='profileImg' accept='image/*' onChange={handleFileOnChange} />
                 <ButtonGroup>
                  <CancleBtn onClick={() => cancle()}>Cancle</CancleBtn>
                  <UpdateUserInfoComplete type='submit' onClick={updateKakaoUserProfileHandler}>Submit</UpdateUserInfoComplete>
                 </ButtonGroup>
                 </>
                );
              }
            })()}
        
      </UpdateUserBox>
    </> 
  );
         
}

export default ProfileUpdate;