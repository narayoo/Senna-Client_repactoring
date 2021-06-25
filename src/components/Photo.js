import React from 'react';
import styled from 'styled-components';
import korea1 from '../img/korea1.jpeg';

const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function Photo() {
  
  return (
    <>
      <PhotoImg src={korea1}></PhotoImg>
    </>
  )
}

export default Photo;