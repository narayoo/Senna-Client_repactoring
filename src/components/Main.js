import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import '../style/main.css';
import Slider from "./Slider"
import LoginModal from './LoginModal';
import ContentModal from './ContentModal';
import Nav from '../components/Nav';
import Album from './Album';
import Search from './Search'
import {localLogin, localLogout} from '../modules/loginReducer';
import { getAllOfPosting } from '../modules/showAllPosting';
import { getPickPosting } from '../modules/pickPosting';
import dotenv from 'dotenv';

dotenv.config()

const {Kakao} = window;

function Main() {
  
  const [scrollTop, setScrollTop] = useState(0); 
  const [modal, setModal] = useState(false);
  const [ctModal, setCtModal] = useState(false);
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(null);
  const [heart , setHeart] = useState(null); // 선택한 포스트의 좋아요 상태
  
  const dispatch = useDispatch();
  const history = useHistory();
  const { accessToken } = useSelector(state => ({
    accessToken : state.loginReducer.login.accessToken,
  })); 
  const { likeUser } = useSelector(state => ({
    likeUser : state.pickPosting.postInfo.likeUser,
  })); 
  // 모든 포스팅 얻어오기 디스패치
  useEffect(() => {
    dispatch(getAllOfPosting());
  },[]);
  // scrollTop 상태값 감지
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [scrollTop]);
  const changeId = (e) => {
    setUserId(e.target.value);
  }
  const changePwd = (e) => {
    setPassword(e.target.value);
  }
  // top 버튼 함수
  const handleTop = () => {  
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollTop(0); 
  }
  // 스크롤 감지 함수
  const handleScroll = () => {
    const scroll = document.body.scrollTop || document.documentElement.scrollTop;
    const { scrollHeight, clientHeight } = document.documentElement;
    const scrollTop = scroll / (scrollHeight - clientHeight);
    setScrollTop(scrollTop);
  };
  // modal 열기
  const openModal = () => {
    setModal(true);
  }
  // 로그인 서밋 후 모달 닫기
  const onConfirm = async(e) => {
    const body = {
      userId: userId,
      password: password,
    }
    dispatch(localLogin(body));
    setModal(false);
  }
  // modal 취소 후 닫기
  const onCancle = () => {
    console.log('취소')
    setModal(false);
  }
  // 로그인 모달 외부 클릭 시 닫기
  const handleModalOff = (e) => {
    const clicked = e.target.closest('.modal');
    if (clicked) return;
    else {
      setModal(false);
    }
  };

   // content modal 열기
   const openCtModal = async (e) => {
    const postId = e.target.id;
    setCtModal(true);
    await dispatch(getPickPosting(postId));

    if(likeUser.includes(userId)){
      setHeart('like');
      console.log('열림 트루',heart)
    }
  }
  // 콘텐츠 모달 외부 클릭 시 닫기
  const handleCtModalOff = async(e) => {
    const clicked = e.target.closest('.ctModal');
    if (clicked) return;
    else {
      setCtModal(false);
      if(heart === 'like'){
        setHeart(null);
        console.log('닫힘',heart)
      }else{
        setHeart(null);
      }
    }
  };
 
  // user logout 
  const logout = () => {
    dispatch(localLogout(accessToken))
    history.push('./')
  }

  // 카카오 로그인
  const onSocialLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: `${process.env.REACT_APP_REDIRECT_URI}`,
    });

  }

  return (
    <>
    {
      <Nav openModal={openModal} scrollTop={scrollTop} logout={logout}/>
    }
      <Slider />
      <div className='topBtnWrapper'>
        <button 
        className='topBtn' 
        style={{display: scrollTop > 0.2 ? 'block' : 'none'}}
        onClick={() => handleTop()}>Top</button>
      </div> 
      <LoginModal
        loading={loading}
        changePwd={changePwd}
        changeId={changeId}
        userId={userId}
        password={password}
        handleModalOff={handleModalOff}
        visible={modal}
        onConfirm={onConfirm}
        onCancle={onCancle}
        onSocialLogin={onSocialLogin}
        >
        <input type='text'></input>  
      </LoginModal>
      <Album openCtModal={openCtModal} />
      <ContentModal
        heart={heart}
        setHeart={setHeart}
        handleCtModalOff={handleCtModalOff}
        ctModal={ctModal}
        >
      </ContentModal>
    </>
  )
}

export default Main;

