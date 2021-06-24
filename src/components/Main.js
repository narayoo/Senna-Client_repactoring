import React, { useState } from 'react';
import Slider from "./Slider"
import LoginModal from './LoginModal';
import Nav from '../components/Nav';
import Album from './Album';

function Main() {

  const [modal, setModal] = useState(false);
  // modal 상태 변경
  const openModal = () => {
    setModal(true);
  }
  // modal 상태 변경2
  const onConfirm = () => {
    console.log('확인')
    setModal(false);
  }
  // modal 상태 변경3
  const onCancle = () => {
    console.log('취소')
    setModal(false);
  }

  return (
    <>
      <Nav openModal={openModal}/>
      {/*<Slider></Slider>*/}
      <LoginModal
        visible={modal}
        onConfirm={onConfirm}
        onCancle={onCancle}>
        <input type='text'></input>  
      </LoginModal>
      <Album />
    </>
  )
}

export default Main;