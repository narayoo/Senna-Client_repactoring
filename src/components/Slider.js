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
import M2 from '../img/M2.png';
import MB1 from "../img/MB1.png";
import '../style/slider.css';

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
  width: 100%;
  height: auto !important;
  align-items: center;
  justify-content: center;
  text-align: center;
  &:focus{
    outline: none;
  }
`; 

const MainImg = styled.img`
  width: 100%;
  height: 100% ;
`;

const MainFont = styled.p`
  position: absolute;
  top:3rem;
  right:0;
  bottom:0;
  left:11rem;
  display: flex; 
  align-items: left; 
  justify-content: left;
  font-size: 2.5rem;
  color: #eeeeee;
  animation: ${ani} 1.5s cubic-bezier(.25,.46,.45,.94) both;
  text-shadow: 8px 6px 6px #5d4037;
  @media all and (max-width:767px) {
    font-size: 1rem;
  }
`;

const Copyright = styled.p`
  position: absolute;
  bottom: 0;
  right: 15px;
  font-weight: 100;
  color: rgba(239, 235, 233, 0.6);
`;
function Slider() {
  return (
    <>  
    <CarouselWrapper>
      <Carousel autoplay>
        <Container>
          <MainImg src={M2} ></MainImg>
          {/* <MainFont>한 장의 사진에 기록되는 당신의 추억 한 조각을<br />새나에서 많은 사람들과 공유해보세요.</MainFont> */}
          <a href="#" className='scrollAni'><span></span><span></span><span></span></a>
          <Copyright>Copyright 2021. SONGYUIJO All Rights Reserved.</Copyright>
        </Container>



{/*         <Container>
          <MainImg src={main2}></MainImg>
          <MainFont>당신의 일상을 떠나 새로운 곳에서 만난<br />모든 것을 앨범처럼 기록하세요.<br />그리고 새나와 함께 나눠요.</MainFont>
           <video controls autoplay="autoplay" loop="loop" muted >
          <source src={main1} type="video/mp4" />
        </video>  
        <a href="#" className='scrollAni'><span></span><span></span><span></span></a>
        </Container>
        <Container>
        <MainImg src={main3}></MainImg>
          <MainFont>새나에서는 언제든 당신이 원하는 곳을 찾고 <br />당신이 모르는 새로운 곳을 만날 수 있으며<br />좋아하는 것을 언제든 꺼내보고<br />소중한 추억을 간직할 수 있습니다. </MainFont>
        <a href="#" className='scrollAni'><span></span><span></span><span></span></a>
        </Container>  */}
      </Carousel>
    </CarouselWrapper>
    </>
    
    );
  }


  export default Slider;

