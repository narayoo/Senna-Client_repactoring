import React from 'react';
import { Carousel } from 'antd';
import Palms from '../video/Palms.mp4'
import main1 from '../video/main1.mp4'
import styled,{ keyframes } from 'styled-components';
import Man from '../video/Man.mp4';
import v from '../img/Group 1.png';
import back from '../img/back.jpeg';
import main from '../img/main.jpeg';
import main2 from '../img/main2 .jpeg';
import main3 from '../img/main3.jpeg';
import main4 from '../img/main4.jpeg';


const ani = keyframes`
  0%{
    letter-spacing:-.5em;
    filter:blur(12px);
    opacity:0;
    }
  100%{
    filter:blur(0);
    opacity:1;
  }
`;
const CarouselWrapper = styled.div`
  z-index: 0;
`;

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width : auto;
  height: 100vh;
  text-align: center;
  &:focus{
    outline: none;
  }
`; 
const MainImg = styled.img`
  opacity: 0.4;
`;
const MainFont = styled.p`
  top: 25rem;
  width: 100%;
  margin: 0 auto;
  font-size: 40px;
  position: absolute;
  color: #eeeeee;
  animation: ${ani} 1.5s cubic-bezier(.25,.46,.45,.94) both;
  text-shadow: 8px 6px 6px #6d4c41;
`;

function Slider() {
  return (
    <>  
    <CarouselWrapper>
      <Carousel autoplay>
        <Container>
          <MainImg src={main2}></MainImg>
          <MainFont>Hello, We are Senna {`:)`}<br />Record your memories<br />And share your memories with people</MainFont>
        </Container>
        <Container>
          <MainImg src={main4}></MainImg>
          <MainFont>나의 기억 속 여행지를 <br />사람들과 공유할 수 있습니다</MainFont>
        <video controls autoplay="autoplay" loop="loop" muted >
          <source src={main1} type="video/mp4" />
        </video>
        </Container> 
      </Carousel>
    </CarouselWrapper>
    </>
    
    );
  }


  export default Slider;

