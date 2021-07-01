import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import '../style/main.css';
import Slider from "./Slider"
import LoginModal from './LoginModal';
import ContentModal from './ContentModal';
import Nav from '../components/Nav';
import Album from './Album';
import axios from 'axios';
import {localLogin, localLogout } from '../modules/loginReducer';
import { getAllOfPosting } from '../modules/showAllPosting';

function Main({gridFunc}) {
  
  const [scrollTop, setScrollTop] = useState(0); 
  const [modal, setModal] = useState(false);
  const [ctModal, setCtModal] = useState(false);
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(null);
  const [likeButton , setLikeButton] = useState(false);
  const [postingId , setPostingId] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector(state => state.loginReducer.login.accessToken); 
  
  window.addEventListener('scroll',gridFunc)
  window.addEventListener('rerize',gridFunc)
  window.addEventListener('load',gridFunc)

  const changeId = (e) => {
    setUserId(e.target.value);
  }
  const changePwd = (e) => {
    setPassword(e.target.value);
  }
  useEffect(() => {
    dispatch(getAllOfPosting());
  },[]);
  // scrollTop 상태값 감지
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [scrollTop]);
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
  // 콘텐츠 모달 외부 클릭 시 닫기
  const handleCtModalOff = (e) => {
    const clicked = e.target.closest('.ctModal');
    if (clicked) return;
    else {
      setCtModal(false);
    }
  };
  // content modal 열기
  const openCtModal = (e) => {
    setCtModal(true);
  }
  // user logout 
  const logout = () => {
    dispatch(localLogout(accessToken))
    history.push('./')
  }

  // likebutton click event
  const handleLikeButton = async() => {
  
    if(!likeButton) {
      await axios.patch('http://54.180.151.176/user/favorite/60da7d60c47a8cdf99d33abd',
      { postingId : '60dabc3078bc87e86f2d51e9' }  
     ).then((res) => {
       setLikeButton(true);
     })
    } 
  }

  const handleDeleteButton = async() =>{
    
    if (likeButton) {
      await axios.delete('http://54.180.151.176/user/favorite/60da7d60c47a8cdf99d33abd',
      { data : { postingId : '60dabc3078bc87e86f2d51e9' } , withCredentials : true}
      ).then((res) => {
        setLikeButton(false);
      })

    }

  }

 
  return (
    <>
    {
      scrollTop > 0.2 ? 
      <Nav openModal={openModal} scrollTop={scrollTop} logout={logout}/>
      :
      <></>
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
        onCancle={onCancle}>
        <input type='text'></input>  
      </LoginModal>
      <Album openCtModal={openCtModal} />
      <ContentModal
        handleCtModalOff={handleCtModalOff}
        ctModal={ctModal}
        handleLikeButton={handleLikeButton}
        likeButton={likeButton}
        handleDeleteButton={handleDeleteButton}
        >
      </ContentModal>
    </>
  )
}

export default Main;

