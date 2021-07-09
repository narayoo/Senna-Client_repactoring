import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import '../style/main.css';
import Slider from "./Slider"
import LoginModal from './LoginModal';
import ContentModal from './ContentModal';
import Nav from '../components/Nav';
import Album from './Album';
import {localLogin, localLogout} from '../modules/loginReducer';
import { getPickPosting } from '../modules/pickPosting';
import { kakaoLogin, kakaoLogout } from '../modules/kakaoReducer';
import Loading from './Loading';
import dotenv from 'dotenv';

dotenv.config()

const {Kakao} = window;

const Main = React.memo(() => {
  const [scrollTop, setScrollTop] = useState(0); 
  const [modal, setModal] = useState(false);
  const [ctModal, setCtModal] = useState(false);
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(null);
  const [heart , setHeart] = useState(null); // 선택한 포스트의 좋아요 상태
  const [kakaoAT , setkakaoAT] = useState(''); // 선택한 포스트의 좋아요 상태
  const [showPosting, setShowPosting] = useState([]);
  const [total, setTotal] = useState(0);


  const dispatch = useDispatch();
  const history = useHistory();
  const { accessToken } = useSelector(state => ({
    accessToken : state.loginReducer.login.accessToken,
  })); 
  const { likeUser } = useSelector(state => ({
    likeUser : state.pickPosting.postInfo.likeUser,
  })); 
  const localAT = useSelector(state => state.kakaoReducer.login.accessToken);


  // scrollTop 상태값 감지
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollTop]);
  // 스크롤 감지 함수
  const handleScroll = async() => {
    const scroll = document.body.scrollTop || document.documentElement.scrollTop;
    const { scrollHeight, clientHeight } = document.documentElement;
    const scrollTop = scroll / (scrollHeight - clientHeight);
    await setScrollTop(scrollTop);
  };
  // top 버튼 함수
  const handleTop = async() => {  
    await window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollTop(0); 
  }
  const changeId = async(e) => {
    await setUserId(e.target.value);
  }
  const changePwd = async(e) => {
    await setPassword(e.target.value);
  }
  // modal 열기
  const openModal = async() => {
    await setModal(true);
  }
  // 로그인 서밋 후 모달 닫기
  const onConfirm = async(e) => {
    const body = {
      userId: userId,
      password: password,
    }
    setLoading(true);
    await dispatch(localLogin(body));
    setLoading(false);
    await setModal(false);
  }
  // modal 취소 후 닫기
  const onCancle = async() => {
    await setModal(false);
  }
  // 로그인 모달 외부 클릭 시 닫기
  const handleModalOff = async(e) => {
    const clicked = e.target.closest('.modal');
    if (clicked) return;
    else {
      await setModal(false);
    }
  };
   // content modal 열기
   const openCtModal = async (e) => {
    const postId = e.target.id;
    setCtModal(true);
    await dispatch(getPickPosting(postId));

    if(likeUser.includes(userId)){
      await setHeart('like');
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
    Kakao.Auth.login({
      success: function(authObj) {
        console.log(authObj)
        let ac = authObj.access_token;
        let socialAC = `Bearer ${ac}`;
        setkakaoAT(socialAC)
        dispatch(kakaoLogin(socialAC));
        setModal(false);
      },
      fail: function(err) {
        console.log(err)
      },
    })
  }
   // 카카오 로그아웃
  const kakaoLogoutHandler = () => {
      dispatch(kakaoLogout(kakaoAT, localAT))
  }


  return (
    <>
      <Nav openModal={openModal} scrollTop={scrollTop} logout={logout} kakaoLogoutHandler={kakaoLogoutHandler} />
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
      <Album openCtModal={openCtModal} total={total} showPosting={showPosting}/>
      <ContentModal
        heart={heart}
        setHeart={setHeart}
        handleCtModalOff={handleCtModalOff}
        ctModal={ctModal}
        >
      </ContentModal>
    </>
  )
})

export default Main;

