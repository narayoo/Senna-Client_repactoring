import React from 'react';
import styled, { createGlobalStyle } from "styled-components";
import Nav from './components/Nav';
// 프레젠테이셔널 컴포넌트가 아닌, 컨테이너 컴포넌트를 불러서 렌더링 하는 것이 좋다.

/* 글로벌 속성 (수정금지)*/

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #1b1b1b;
  }
  * {
    box-sizing: border-box;
    font-family: 'Scada', sans-serif;
    color: #f5f5f5;
  }
`;


function App() {
  return (
    <>
      <GlobalStyle />
      <Nav />
    </>
  );
}

export default App;
