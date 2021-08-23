/* eslint-disable */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Main from "./components/Main";
import Mypage from "./components/Mypage";
import Addcontents from "./components/Addcontents";
import SignUp from "./components/SignUp";
import Search from "./components/Search";
import ProfileUpdate from "./components/ProfileUpdate";
import UpdateMycontents from "./components/UpdateMycontents";

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
  html{
    scroll-behavior: smooth;
  }
`;

function App() {
  return (
    <>
    <GlobalStyle />
    <Switch>
      <Route exact path='/' component={Main}/>
      <Route exact path='/mypage' component={Mypage} />
      <Route exact path='/addcontents' component={Addcontents} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/profileupdate' component={ProfileUpdate} />
      <Route exact path='/contentupdate' component={UpdateMycontents} />
    </Switch>
    </>
  );
}

export default App;