import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// 만들었던 Nav 불러오기
import Nav from '../components/Nav';
import { show, hide } from '../modules/logModal';

function NavContainer () {
  
  const dispatch = useDispatch(); 
  
  // 모달 보여주기
  const openModal = () => dispatch(show());
  // 모달 끄기
  const closeModal = () => dispatch(hide());

  return <Nav 
  openModal={openModal}
  closeModal={closeModal}
  />
    

}

export default NavContainer;