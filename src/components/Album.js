import React from 'react';
import "../style/grid.css";
import styled from 'styled-components';
import korea1 from '../img/korea1.jpeg';
import korea2 from '../img/korea2.jpeg';
import korea3 from '../img/korea3.jpeg';
import korea4 from '../img/korea4.jpeg';
import korea5 from '../img/korea5.jpeg';

const AlbumSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const PhotoImg = styled.img`
  width:100%;
`;

const list = [korea1,korea2,korea3,korea4,korea5,korea1,korea2,korea3,korea4,korea5];
const photoList = list.map(e => <div className='item'><PhotoImg src={e} loading="lazy"></PhotoImg></div>)

function Album() {

  return (
    
    <>
    <AlbumSection>
      <div className='grid'>
        {photoList}
      </div>
    </AlbumSection>
    </>
    
  )

}
export default Album;