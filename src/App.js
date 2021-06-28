import React from "react";
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Main from './components/Main';
import Mypage from './components/Mypage';
import Addcontents from './components/Addcontents';
import Search from './components/Search'
import ProfileUpdate from './components/ProfileUpdate'

// 프레젠테이셔널 컴포넌트가 아닌, 컨테이너 컴포넌트를 불러서 렌더링 하는 것이 좋다.

/* 글로벌 속성 (수정금지)*/

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #1b1b1b;
    -ms-overflow-style: none;
  }
  * {
    box-sizing: border-box;
    font-family: 'Scada', sans-serif;
    color: #f5f5f5;
  }
  ::-webkit-scrollbar { 
    display: none; 
  }
`;

function App() {
  return (
    <>
    <GlobalStyle />
    <Switch>
      <Route exact path='/' component={Main} />
      <Route exact path='/mypage' component={Mypage} />
      <Route exact path='/addcontents' component={Addcontents} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/profileupdate' component={ProfileUpdate} />
    </Switch>
    </>
  );
}

export default App;
