import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Main from '../components/Main';
import Mypage from '../components/Mypage';

function MainContainer() {
  const main = useSelector(state => state.main); // 모듈에서 선언된 기본 상태값을 셀렉트해옴
  const dispatch = useDispatch();
  
  // 액션 생성 함수 불러와주기 ../modules/main
  // const show = useCallback(text => dispatch(addForm(text)), [dispatch])
  
  return (
    <>
      <Main />
    </>
  )
}