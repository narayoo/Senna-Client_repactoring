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
  height : 35rem;
  background-color: #1b1b1b;
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

          {/* <video controls autoplay="autoplay" muted >

          <video controls autoplay="autoplay" loop="loop" muted >

            <source src={Man} type="video/mp4" />
          </video> */}
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

