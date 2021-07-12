import React from 'react';
import { Carousel } from 'antd';
import styled,{ keyframes } from 'styled-components';
// import main2 from '../img/main2 .jpeg';
// import main4 from '../img/main4.jpeg';
import main1 from '../img/1.png';
import main2 from '../img/2.png';
import main3 from '../img/3.png';

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
  align-items: center;
  &:focus{
    outline: none;
  }
`; 
const MainImg = styled.img`
  /* opacity: 0.4; */
`;
const MainFont = styled.p`
  position: absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  display: flex; 
  align-items: center; 
  justify-content: center;
  font-size: 2.5rem;
  color: #eeeeee;
  animation: ${ani} 1.5s cubic-bezier(.25,.46,.45,.94) both;
  text-shadow: 8px 6px 6px #5d4037;
  @media all and (max-width:767px) {
    font-size: 1rem;
  }
`;

function Slider() {
  return (
    <>  
    <CarouselWrapper>
      <Carousel autoplay>
        <Container>
          <MainImg src={main1}></MainImg>
          {/* <MainFont>나의 기억 속 여행지를 <br />사람들과 공유할 수 있습니다</MainFont> */}
        <a href="#" className='scrollAni'><span></span><span></span><span></span></a>
        </Container>
        <Container>
          <MainImg src={main2}></MainImg>
          {/* <MainFont>Hello, We are Senna {`:)`}<br />Record your memories<br />And share your memories with people</MainFont> */}
        {/* <video controls autoplay="autoplay" loop="loop" muted >
          <source src={main1} type="video/mp4" />
        </video>  */}
        <a href="#" className='scrollAni'><span></span><span></span><span></span></a>
        </Container>
        <Container>
          <MainImg src={main3}></MainImg>
        <a href="#" className='scrollAni'><span></span><span></span><span></span></a>
        </Container>
      </Carousel>
    </CarouselWrapper>
    </>
    
    );
  }


  export default Slider;

