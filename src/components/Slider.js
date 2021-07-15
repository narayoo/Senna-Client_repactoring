import React from 'react';
import { Carousel } from 'antd';
import styled,{ keyframes } from 'styled-components';
import main1 from '../img/main1.png';
import main2 from '../img/main2.png';
import main3 from '../img/main3.png';
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
  justify-content: center;
  text-align: center;
  &:focus{
    outline: none;
  }
`; 


const Picture = styled.picture`
  
`

const MainImg = styled.img`
  width: 100%;
  height: auto;

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
         <Picture>
           <source srcSet={main1} media="(min-width: 768px)" />
           <source srcSet={iphone1} media="(min-width: 767px)" />
           <source srcSet={iphone1} media="(max-width: 766px)" />
         <MainImg src={main1} alt='image1'></MainImg>
         </Picture>
          {/* <MainFont></MainFont> */}  
        <a href="#" className='scrollAni'><span></span><span></span><span></span></a>
        </Container>
        <Container>
        <Picture>
           <source srcSet={main2} media="(min-width: 768px)" />
           <source srcSet={iphone2} media="(min-width: 767px)" />
           <source srcSet={iphone2} media="(max-width: 766px)" />
         <MainImg src={main2} alt='image2'></MainImg>
         </Picture>
          {/* <MainFont></MainFont> */}
        {/* <video controls autoplay="autoplay" loop="loop" muted >
          <source src={main1} type="video/mp4" />
        </video>*/}
        <a href="#" className='scrollAni'><span></span><span></span><span></span></a>
        </Container>
        <Container>
          <Picture>
             <source srcSet={main3} media="(min-width: 768px)" />
             <source srcSet={iphone3} media="(min-width: 767px)" />
             <source srcSet={iphone3} media="(max-width: 766px)" />
            <MainImg src={main3} alt='image3'></MainImg>
          </Picture>
          {/* <MainFont></MainFont> */}
        <a href="#" className='scrollAni'><span></span><span></span><span></span></a>
        </Container>
      </Carousel>
    </CarouselWrapper>
    </>
    
    );
  }


  export default Slider;

