import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import "../style/grid.css";
import styled from 'styled-components';
import korea1 from '../img/korea1.jpeg';
import korea2 from '../img/korea2.jpeg';
import korea3 from '../img/korea3.jpeg';
import korea4 from '../img/korea4.jpeg';
import korea5 from '../img/korea5.jpeg';


// album section css
const AlbumSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`;
// Img css
const PhotoImg = styled.img`
  width:100%;
`;
// add 버튼 css
const AddButton = styled.button`
  width: 100px;
  height: 37px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #eeeeee;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: none;
  margin-bottom: 2rem;

  &:hover{
    background-color: #00acc1;
    box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
    color: #eeeeee;
  }
`;
// add 버튼 wrapper css
const AddButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 65%;
  align-items: center;
`;
// total contents Css
const TotalComponent = styled.p`
`;

//const list = [ korea1,korea2,korea3,korea4,korea5,korea1,korea2,korea3,korea4,korea5,korea1,korea2,korea3,korea4,korea5,korea1,korea2,korea3,korea4,korea5 ];

export default function Album({ openCtModal, gridFunc}) {
  
  
  let list = [];

  useEffect(() => {
    
    window.addEventListener("load", gridFunc);
    window.addEventListener("rerize", gridFunc);
  },[list])
  
  list = useSelector(state => state.showAllPosting.data.data);
  
  return (
    <>
    {console.log('list::',list)}
    <AlbumSection>
      <AddButtonWrapper>
        <TotalComponent>
          <i className="fas fa-feather-alt">&nbsp;&nbsp;122,651</i>
        </TotalComponent>
        <Link to='/addcontents'>
          <AddButton>Add</AddButton>
        </Link>
      </AddButtonWrapper>
      <div className='grid'>
        { list?.map((photo,index)=> {
          return <div className='item' key={index} onClick={(el) => openCtModal(el)}>
            <PhotoImg key={index} src={photo.image[0]} loading="lazy"></PhotoImg>    
          </div>
          }
        )}
      </div>
    </AlbumSection>
    </>
  )
}