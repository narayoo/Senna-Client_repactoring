import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import MypageNav from '../components/MypageNav';
import { localLogout } from '../modules/loginReducer';
import { getUserInfo } from '../modules/loginReducer';
import { getKakaoUserInfo } from '../modules/kakaoReducer'
import { onUpdatePosting } from '../modules/updatePosting';
import Autocomplete from "react-google-autocomplete";
import '../style/google.css'

const AddCtWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  width: 50%;
  max-width: 700px;
  margin: 0 auto;
  @media all and (max-width:767px) {
    width: 100%;
  }
`;
const AddFile = styled.input`
  margin-top: 0.4rem;
  padding: 0.7rem;
  height: 10%;
  width: 80%;
  color: #1b1b1b;
  background: linear-gradient(#ffffff, #aeaeae);
  font-size: 13px;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:hover{
    color: #fff;
    cursor: pointer;
    background: #494949;
  }
`;
const AddCtText = styled.textarea`
  margin-top: 14rem;
  width: 80%;
  height: 20rem;
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
  @media all and (max-width:767px) {
    margin-top: 6em;
    height: 15rem;
  }
`;
const ButtonGroup = styled.section`
  max-width: 800px;
  width: 80%;
  margin-top: 3rem;
  text-align: right;
  @media all and (max-width:767px) {
    display: flex;
    justify-content: space-between;
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
  background-color: #00acc1;
  box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
  color: #fff;
  border: none;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-bottom: 2rem;
  margin-left: 1.3rem;

  &:hover{
    color: #000;
  background-color: #fff;
 
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.5);
    
    transform: translateY(-7px);
  }
`;
const HashTagBox = styled.input`
  padding-left: 1rem;
  padding: 0.7rem;
  height: 10%;
  width: 80%;
  color: #1b1b1b;
  background: linear-gradient(#ffffff, #aeaeae);
  font-size: 17px;
  resize: none;
  border: none;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:focus{
    outline: none;
    background: #ffffff;
  }
`;
const Warning = styled.p`
  font-size: 12px;
  color: #eeeeee;
  margin-top: 1.2rem;
  justify-content: left;
`;
const UpdateMycontents = React.memo(() => {
  const isLogin = useSelector(state => state.loginReducer.login.isLogin)
  const kakaoIsLogin = useSelector(state => state.kakaoReducer.login.isLogin)
  const userId = useSelector(state => state.loginReducer.login.userId);
  const kakaoUserId = useSelector(state => state.kakaoReducer.login.userId)
  const { accessToken } = useSelector(state => ({
    accessToken : state.loginReducer.login.accessToken,
  }));
  const kakaoAcToken = useSelector(state => state.kakaoReducer.login.accessToken);
  const { content, hashtag, postingId, } = useSelector(state => ({
    content: state.pickPosting.postInfo.content,
    hashtag: state.pickPosting.postInfo.hashtag,
    postingId: state.pickPosting.postInfo.postId,
  }));  
  const [ text, setText ] = useState(content);
  const [ hash, setHash ] = useState(hashtag.map(e => `#${e}`));
  const [ photo, setPhoto ] = useState([]);
  const [ ok, setOk ] = useState(false);
  const [ place, setPlace] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const imgArr = [];

  const cancle = () => {
    window.location.replace("/mypage")
  };
  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const onChangeHash = (e) => {
    setHash(e.target.value);
  };
  const handleFileOnChange = (e) => {
    // 업데이트해야하니까 여기서 기존이미지들 삭제해야함
    let file = e.target.files;
    if(file.length > 5 || file.length < 1) {
      alert('파일은 1장 이상 5장 이하입니다')
      setOk(false);
    }else{
      if(imgArr.length !== 0){
        imgArr = [];
      }else{
        for(let i=0; i<file.length; i++){
          imgArr.push(file[i])
        }
        setOk(true);
      }
    }
    setPhoto(photo.concat(imgArr));
  };
  const onUpdateContent = async(e) => {
    if(ok && isLogin){
      await dispatch(onUpdatePosting(userId,photo,text,hash,postingId,place));
      await dispatch(getUserInfo(accessToken));
      alert('수정이 완료되었습니다.')
      history.push('./mypage');
    }else if (ok && kakaoIsLogin){
      await dispatch(onUpdatePosting(kakaoUserId,photo,text,hash,postingId,place));
      await dispatch(getKakaoUserInfo(kakaoAcToken));
      alert('수정이 완료되었습니다.')
      history.push('./mypage');
    }
    else{
      alert('필수 : 파일은 1장 이상 5장 이하입니다');
    }
  };
  const logout = () => {
    dispatch(localLogout(accessToken))
    history.push('./')
  };

  return (
    <>
      <MypageNav logout={logout}/>
      <AddCtWrapper>
        <AddCtText placeholder='Write Your Memories' value={text} onChange={onChangeText}/>
        <HashTagBox placeholder='ex) #Korea #Seoul' value={hash} onChange={onChangeHash}/>
        <Warning> ⚠️ 사진은 모두 다시 선택해주셔야 합니다 </Warning>
        <AddFile multiple type='file' className='img' name='images' accept='image/*' onChange={handleFileOnChange}></AddFile>
        <>
        <Autocomplete apiKey='AIzaSyBZ00JR8dRVy70lU5omSXLk3YsGWi0c0NE' onPlaceSelected={(place,inputRef, autocomplete) => { setPlace(autocomplete.gm_accessors_.place.Dj.formattedPrediction)}} 
          options={{
            types: [],
            fields: ['geometry.location','address_components','place_id','formatted_address']
          }}
        id='autocomplete'/>
        </>
        <ButtonGroup>
          <Link to='./'>
            <CancleBtn onClick={(e) => cancle(e)}>Cancle</CancleBtn>
          </Link>
          <SubmitBtn onClick={(e) => onUpdateContent(e)}>Submit</SubmitBtn>
      </ButtonGroup>
    </AddCtWrapper>
  </>
  );
})
export default UpdateMycontents;
