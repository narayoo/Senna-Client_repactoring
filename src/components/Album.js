import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import "../style/grid.css";
import styled from 'styled-components';
import StackGrid from "react-stack-grid";

// album section css
const AlbumSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  padding-left: 10rem;
  padding-right: 10rem;
`;
// Img css
const PhotoImg = styled.img`
  width:100%;
  z-index: -1;
  transition: all 0.5s ease-in-out;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:hover{
    cursor: pointer;
    transform:scale(1.1);  
    -webkit-transform:scale(1.1);   
    -moz-transform:scale(1.1);
    -o-transform:scale(1.1);  
  }
`;
// add 버튼 wrapper css
const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 78%;
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
// total contents Css
const TotalComponent = styled.p`
`;
const Album = React.memo(({ openCtModal }) => {

  let list = useSelector(state => state.showAllPosting.data.data);
  const isLogin = useSelector(state => state.loginReducer.login.isLogin); 
 
  return (
    <>
    <AlbumSection>
      <AddButtonWrapper>
        <TotalComponent>
          <i className="fas fa-feather-alt">&nbsp;&nbsp;{list?.length}</i>
        </TotalComponent>
        {
          isLogin ? 
          <Link to='/addcontents'>
            <AddButton>Add</AddButton>
          </Link>
          :
          <></>
        }
      </AddButtonWrapper>
      <StackGrid 
        columnWidth={300}
        gutterWidth={25}
        gutterHeight={25}
        style={{ width: "100%" }}>
        { list?.map((photo,index)=> {
          return <div key={index} onClick={(el) => openCtModal(el)}>
            <PhotoImg id={photo._id} key={index} src={photo.image[0]} loading="lazy"></PhotoImg>    
          </div>
          }
        )}
      </StackGrid>
    </AlbumSection>
    </>
  )
})

export default Album;