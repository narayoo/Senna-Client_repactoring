import React  from 'react';
import { Link } from 'react-router-dom'
import '../style/nav.css';
import CountrySelect from './CountrySelect';
import logo from '../img/SennaLogo.png';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getUserInfo } from '../modules/loginReducer';

// 네비바 영역
const NavSection = styled.div`
  width: 100%;
  position: sticky;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
  transition: all 0.3s ease-in-out;
`;
// 로고 
const Logo = styled.img`
  height: 5rem;
  display: block;
  margin-left: 3rem;
  margin-top: 1rem;
  position: absolute;
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
function Nav({ openModal, scrollTop, logout, kakaoLogout }) {
  const isLogin = useSelector(state => state.loginReducer.login.isLogin);
  const kakaoLogin = useSelector(state => state.kakaoReducer.login.isLogin);
  const accessToken = useSelector(state => state.loginReducer.login.accessToken); 

  const dispatch = useDispatch();
  const history = useHistory();

  // Logo 클릭 시 메인화면 새로고침 이동
  const clickLogo = () => {
    window.location.replace("/")
  }
  const gotoMypage = () => {
    history.push('./mypage');
    dispatch(getUserInfo(accessToken));
  }
  
  return (
    <>
      <NavSection className={ scrollTop > 0.01 ? 'darkNav' : 'original' }>
        { scrollTop  > 0.01 ? 
          <>
          <Link to='./'>
            <Logo src={logo} onClick={clickLogo} style={scrollTop > 0.01 ? {position:'static', marginTop:0} : {position:'absolute'}}/>
          </Link>
          <CountrySelect />
          <ButtonGroup>
            { 
            (() => {
              if(isLogin) {
                return (
                  <>
                  <NavButton onClick={() => gotoMypage()}>Mypage</NavButton>
                  <NavButton onClick={() => logout()}>Logout</NavButton>
                  </>
              )}else if(kakaoLogin){
                return (
                  <>
                  <NavButton onClick={() => gotoMypage()}>Mypage</NavButton>
                  <NavButton onClick={() => kakaoLogout()}>Logout</NavButton>
                  </>
              )}else{
                return (
                  <>
                  <Link to='/signup'>
                    <NavButton>Join Free</NavButton>
                  </Link>
                  <NavButton onClick={openModal}>Login</NavButton>
                  </>
                )}
            })()
            }
          </ButtonGroup>
        </>
        :
        <>
           <Link to='./'>
            <Logo src={logo} onClick={clickLogo}/>
          </Link>
        </>
        }
      </NavSection>
    </>
  )
}

export default Nav;