import React, {useState}  from 'react';
import { Link } from 'react-router-dom'
import '../style/nav.css';
import CountrySelect from './CountrySelect';
import logo from '../img/SennaLogo.png';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getUserInfo } from '../modules/loginReducer';
import { getKakaoUserInfo} from '../modules/kakaoReducer'

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

  @media all and (max-width:767px) {


  }
`;
// 로고 
const Logo = styled.img`
  height: 5rem;
  display: flex;
  margin-left: 3rem;
  margin-top: 1rem;
  position: absolute;
  ;
  &:hover {
    cursor: pointer;
  }
  @media all and (max-width:767px) {
    height: 2.5rem;
    margin-left: 1rem;
    margin-right: 0rem;
  }
`;
// nav에 있는 버튼 
const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  margin-right: 30px;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
  @media all and (max-width:767px) {
    font-size: 13px;
    margin-top: 1rem;
  }
`;
const ButtonGroup = styled.div`
  margin-right: 2rem;
  @media all and (max-width:767px) {
    margin-right: 0rem;
    display: none;
  }
`;
const CountrySelectSection = styled.div`
  width: 50%;
  @media all and (max-width:767px) {
    width: 80%;
    padding-right: 1rem;
    display: none;
  }
`;
const CountrySelectSection2 = styled.div`
  @media all and (max-width:767px) {
    width: 80%;
    padding-right: 1rem;
    display: block;
  }
  display: none;
`;
const HambugBtn = styled.div`
  @media all and (max-width:767px) {
    display: block;
    padding-right: 1.7rem;
    font-size: 20px;
    cursor: pointer;
  }
  display: none;
`;
const HambugToggle = styled.div`
   @media all and (max-width:767px) {
    width: 100%;
    position: sticky;
    top: 3.5rem;
    display: flex;
    align-items: center;
    z-index: 3;
    transition: all 0.3s ease-in-out;
    background-color: rgba(0,0,0,0.8);
    box-shadow: 5px 7px 6px rgba(0,0,0,0.5);
    flex-direction: column;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  display: none;
`;

function Nav({ openModal, scrollTop, logout, kakaoLogoutHandler,}) {
  const isLogin = useSelector(state => state.loginReducer.login.isLogin);
  const kakaoLogin = useSelector(state => state.kakaoReducer.login.isLogin);
  const accessToken = useSelector(state => state.loginReducer.login.accessToken); 
  const kakaoAcToken = useSelector(state => state.kakaoReducer.login.accessToken);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // Logo 클릭 시 메인화면 새로고침 이동
  const clickLogo = () => {
    window.location.replace("/")
  }
  const gotoMypage = async() => {
      history.push('./mypage');
      await dispatch(getUserInfo(accessToken));
  }
  const gotoKakaoMypage = async() => {
    history.push('./mypage');
    await dispatch(getKakaoUserInfo(kakaoAcToken));
  }
  const onHambugBtn = async() => {
    setOpen(!open);
  }
  
  return (
    <>
      <NavSection className={ scrollTop > 0.01 ? 'darkNav' : 'original' }>
        { scrollTop  > 0.01 ? 
          <>
          <Link to='./'>
            <Logo src={logo} onClick={clickLogo} style={scrollTop > 0.01 ? {position:'static', marginTop:0} : {position:'absolute'}}/>
          </Link>
          <CountrySelectSection>
            <CountrySelect />
          </CountrySelectSection>
          <HambugBtn onClick={(e) => onHambugBtn(e)}>
            <i className="fas fa-bars"></i>
          </HambugBtn>
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
                  <NavButton onClick={() => gotoKakaoMypage()}>Mypage</NavButton>
                  <NavButton onClick={() => kakaoLogoutHandler()}>Logout</NavButton>
                  </>
              )}else if (!isLogin && !kakaoLogin){
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
      {scrollTop  > 0.01 && 
      open
      ? 
        <HambugToggle>
          { 
            (() => {
              if(isLogin) {
                return (
                  <>
                  <CountrySelectSection2>
                    <CountrySelect />
                  </CountrySelectSection2>
                  <NavButton onClick={() => gotoMypage()}>Mypage</NavButton>
                  <NavButton onClick={() => logout()}>Logout</NavButton>
                  </>
              )}else if(kakaoLogin){
                return (
                  <>
                  <CountrySelectSection2>
                    <CountrySelect />
                  </CountrySelectSection2>
                  <NavButton onClick={() => gotoKakaoMypage()}>Mypage</NavButton>
                  <NavButton onClick={() => kakaoLogoutHandler()}>Logout</NavButton>
                  </>
              )}else if (!isLogin && !kakaoLogin){
                return (
                  <>
                  <CountrySelectSection2>
                    <CountrySelect />
                  </CountrySelectSection2>
                  <Link to='/signup'>
                    <NavButton>Join Free</NavButton>
                  </Link>
                  <NavButton onClick={openModal}>Login</NavButton>
                  </>
                )}
            })()
            }
        </HambugToggle>
      :
      <></>
      }
    </>
  )
}

export default Nav;