import React, { useState, useEffect } from 'react';
import '../style/main.css';
import Slider from "./Slider"
import LoginModal from './LoginModal';
import ContentModal from './ContentModal';
import Nav from '../components/Nav';
import Album from './Album';
function Main() {

  const [scrollTop, setScrollTop] = useState(0); 
  const [modal, setModal] = useState(false);
  const [ctModal, setCtModal] = useState(false);
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
  // modal 서밋 후 닫기
  const onConfirm = () => {
    console.log('확인')
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
  return (
    <>
    <Nav openModal={openModal} scrollTop={scrollTop}/>
      <Slider />
      <div className='topBtnWrapper'>
        <button 
        className='topBtn' 
        style={{display: scrollTop > 0.2 ? 'block' : 'none'}}
        onClick={() => handleTop()}>Top</button>
      </div> 
      <LoginModal
        handleModalOff={handleModalOff}
        visible={modal}
        onConfirm={onConfirm}
        onCancle={onCancle}>
        <input type='text'></input>  
      </LoginModal>
      <Album openCtModal={openCtModal}/>
      <ContentModal
        handleCtModalOff={handleCtModalOff}
        ctModal={ctModal}
        >
      </ContentModal>
    </>
  )
}

export default Main;