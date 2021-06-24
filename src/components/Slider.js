import React from 'react';
import { Carousel } from 'antd';
import Palms from '../video/Palms.mp4'
import styled from 'styled-components';
import Man from '../video/Man.mp4'


const Container = styled.div`
  overflow: hidden;
  display: flex;
  width : 100%;
  height : 460px;
  margin-top: 10rem;
  background-color: #1b1b1b;
`;


function Slider() {
    return (
      <>  
  <Carousel autoplay>
      <Container>
          <video controls autoplay="autoplay" muted >
            <source src={Man} type="video/mp4" />
          </video>  
      </Container>
      <Container>
      <video controls autoplay="autoplay" muted >
            <source src={Palms} type="video/mp4" />
          </video>
          </Container>
  </Carousel>
      </>
    
    );
  }


  export default Slider;
