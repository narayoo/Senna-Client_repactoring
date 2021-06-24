import React, { useState } from 'react';
import { createStore } from 'redux';
import styled from 'styled-components';
import Slider from "./Slider"
import Mypage from "./Mypage";
import NavContainer from '../containers/NavContainer'


function Main({}) {
  return (
    <>
      <NavContainer/>
      <Slider>
      </Slider>
    </>
  )
}

export default Main;