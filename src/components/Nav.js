import React from 'react';
import SearchBar from '../components/SearchBar';
import logo from '../img/SennaLogo.png';
import styled from 'styled-components';

// 네비바 영역
const NavSection = styled.div`
  width: 100%;
  height: 6rem;
  background-color: #1b1b1b;
  border-bottom : 1px solid #212121;
  position: sticky;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
// 로고 
const Logo = styled.img`
  height: 6rem;
  display: block;
  margin-left: 20px;
  
  &:hover {
    cursor: pointer;
  }
`;
// nav에 있는 버튼 
const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  margin-right: 30px;
  
  &:hover {
    cursor: pointer;
  }
`;

function Nav({ openModal, closeModal }) {
  return (
    <>
      <NavSection>
        <Logo src={logo}/>
        <SearchBar />
        <NavButton onClick={openModal}>
         Login
        </NavButton>
      </NavSection>
    </>
  )
}

export default Nav;