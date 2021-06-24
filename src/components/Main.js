import React, { useState } from 'react';
import Slider from "./Slider"
import LoginModal from './LoginModal';
import Nav from '../components/Nav';

function Main() {

  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  }
  const onConfirm = () => {
    console.log('확인')
    setModal(false);
  }
  const onCancle = () => {
    console.log('취소')
    setModal(false);
  }

  return (
    <>
      <Nav openModal={openModal}/>
      <Slider></Slider>
      <LoginModal
        visible={modal}
        onConfirm={onConfirm}
        onCancle={onCancle}>
        <input type='text'></input>  
      </LoginModal>
    </>
  )
}

export default Main;