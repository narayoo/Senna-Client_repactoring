import React from 'react';
import { Link } from 'react-router-dom'
import '../style/nav.css';
import SearchBar from '../components/SearchBar';
import logo from '../img/SennaLogo.png';
import styled from 'styled-components';

// 네비바 영역
const NavSection = styled.div`
  width: 100%;
  position: sticky;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  transition: all 0.3s ease-in-out;
  height: 7rem;
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
// Logo 클릭 시 메인화면 새로고침 이동
const clickLogo = () => {
  window.location.replace("/")
}
function Nav({ openModal, scrollTop }) {
  
  return (
    <>
      <NavSection className={ scrollTop > 0.01 ? 'darkNav' : '' }>
        <Link to='./'>
          <Logo src={logo} onClick={clickLogo}/>
        </Link>
        <SearchBar />
        <NavButton onClick={openModal}>
         Login
        </NavButton>
      </NavSection>
    </>
  )
}

export default Nav;