import React  from 'react';
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
  height: 8rem;
`;
// 로고 
const Logo = styled.img`
  height: 5rem;
  display: block;
  margin-left: 3rem;
  
  &:hover {
    cursor: pointer;
  }
`;
// nav에 있는 버튼 
const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  margin-right: 30px;
  
  &:hover {
    cursor: pointer;
  }
`;
const ButtonGroup = styled.div`
  margin-right: 2rem;
`;
function Nav({ openModal, scrollTop, isLogin, logoutHandler }) {

  // Logo 클릭 시 메인화면 새로고침 이동
  const clickLogo = () => {
    window.location.replace("/")
  }
  

  
  return (
    <>
      <NavSection className={ scrollTop > 0.01 ? 'darkNav' : '' }>
        <Link to='./'>
          <Logo src={logo} onClick={clickLogo}/>
        </Link>
        <SearchBar />
        <ButtonGroup>
          { isLogin ? 
          <>
            <Link to='/mypage'>
              <NavButton>Mypage</NavButton>
            </Link>
            <NavButton onClick={() => logoutHandler()}>Logout</NavButton>
          </>
          :
          <>
            <Link to='/signup'>
              <NavButton>Join Free</NavButton>
            </Link>
            <NavButton onClick={openModal}>Login</NavButton>
          </>
          }
        </ButtonGroup>
      </NavSection>
    </>
  )
}

export default Nav;