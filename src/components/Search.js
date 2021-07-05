import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import "../style/grid.css";
import styled from 'styled-components';
import Nav from './Nav'
import StackGrid from "react-stack-grid";
import { searchContent } from "../modules/searchReducer"
import searchBar from "./SearchBar"

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
  background-color: #fff;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-bottom: 2rem;

  &:hover{
    background-color: #00acc1;
    box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;
// add 버튼 wrapper css
const AddButtonWrapper = styled.div`
  width: 65%;
  text-align: right;
`;


const SearchResult = styled.div`
  margin-top: 5rem;
  margin-left: 20rem;
  width: 200px;
  height: 100px;
  font-weight: bold;
  font-size: 60px;
`



function Search({openCtModal , searchHandler }) {

  const dispatch = useDispatch();
  let list = useSelector(state => state.showAllPosting.data.data);

  return (
    <>
    <Nav />
    <SearchResult>{searchHandler()}</SearchResult>
    <AlbumSection>
      <AddButtonWrapper>
        <Link to='/addcontents'>
          <AddButton>Add</AddButton>
        </Link>
      </AddButtonWrapper>
      <StackGrid 
        columnWidth={400}
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
}
export default Search;