import React from 'react';
import { Carousel } from 'antd';
import styled,{ keyframes } from 'styled-components';
import main1 from '../img/main1.png';
import main2 from '../img/main2.png';
import main3 from '../img/main3.png';
import ipad1 from '../img/ipad1.png';
import ipad2 from '../img/ipad2.png';
import ipad3 from '../img/ipad3.png';
import iphone1 from '../img/iphone1.png';
import iphone2 from '../img/iphone2.png';
import iphone3 from '../img/iphone3.png';

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
  height: auto;
  align-items: center;
  &:focus{
    outline: none;
  }
`; 


const Picture = styled.picture`

`

const MainImg = styled.img`
  width: 100%;
  height: 100%;
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
          <Picture>
          <source srcSet={main1} media="(min-width: 1000px)" />
          <source srcSet={ipad1} media="(min-width: 700px)" />
          <source srcSet={iphone1} media="(min-width: 400px)" />
          <MainImg src={main1}></MainImg>
          {/* <MainFont>나의 기억 속 여행지를 <br />사람들과 공유할 수 있습니다</MainFont> */}
          </Picture>
        <a href="#" className='scrollAni'><span></span><span></span><span></span></a>
        </Container>
        <Container>
        <Picture>
          <source srcSet={main2} media="(min-width: 1000px)" />
          <source srcSet={ipad2} media="(min-width: 700px)" />
          <source srcSet={iphone2} media="(min-width: 400px)" />
          <MainImg src={main2}></MainImg>
          {/* <MainFont>Hello, We are Senna {`:)`}<br />Record your memories<br />And share your memories with people</MainFont> */}
        {/* <video controls autoplay="autoplay" loop="loop" muted >
          <source src={main1} type="video/mp4" />
        </video>  */}
        </Picture>
        <a href="#" className='scrollAni'><span></span><span></span><span></span></a>
        </Container>
        <Container>
        <Picture>
          <source srcSet={main3} media="(min-width: 1000px)" />
          <source srcSet={ipad3} media="(min-width: 700px)" />
          <source srcSet={iphone3} media="(min-width: 400px)" />
          <MainImg src={main3}></MainImg>
        <a href="#" className='scrollAni'><span></span><span></span><span></span></a>
        </Picture>
        </Container>
      </Carousel>
    </CarouselWrapper>
    </>
    
    );
  }


  export default Slider;

