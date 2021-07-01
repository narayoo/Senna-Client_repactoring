import React from 'react';
import { Carousel } from 'antd';
import Palms from '../video/Palms.mp4'
import styled from 'styled-components';
import Man from '../video/Man.mp4';
import v from '../img/Group 1.png';

const Container = styled.div`
  overflow: hidden;
  display: flex;
  width : auto;
  height: 100vh;
  opacity : 0.7;
  background-color: #1b1b1b;
  &:focus{
    outline: none;
  }
`; 

const CarouselWrapper = styled.div`
  z-index: 0;
`;
function Slider() {
  return (
    <>  
    <CarouselWrapper>
      <Carousel autoplay>
        <Container>
          <img src={v}></img>
        </Container>
        <Container>
        <video controls autoplay="autoplay" loop="loop" muted >
          <source src={Palms} type="video/mp4" />
        </video>
        </Container>
      </Carousel>
    </CarouselWrapper>
    </>
    
    );
  }


  export default Slider;

