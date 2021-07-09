import styled from 'styled-components';
import logo from '../img/SennaLogo.png';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const MyPageNavWrapper = styled.div`
  position: relative;
`;
// 로고 
const Logo = styled.img`
  position: absolute;
  height: 5rem;
  display: block;
  margin-left: 3rem;
  margin-top: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
// nav에 있는 버튼 
const NavButton = styled.button`
  right: 0;

  position: absolute;
  background: none;
  border: none;
  font-size: 15px;
  margin-right: 2rem;
  margin-top: 2rem;
  
  &:hover {
    cursor: pointer;
  }
`;


export default function MypageNav({logout, kakaoLogoutHandler}) {

  const isLogin = useSelector(state => state.loginReducer.login.isLogin)
  const kakaoIsLogin = useSelector(state => state.kakaoReducer.login.isLogin)


  // Logo 클릭 시 메인화면 새로고침 이동
  const clickLogo = () => {
    window.location.replace("/")
  }

  return (
    <MyPageNavWrapper>
      <Link to='./'>
        <Logo src={logo} onClick={clickLogo}/>
      </Link>
           {(()=> {
              if(isLogin){
                return (
                  <NavButton onClick={() => logout()}>Logout </NavButton>

                )
              } else if (kakaoIsLogin){
                return (
                  <NavButton onClick={() => kakaoLogoutHandler()}>Logout </NavButton>
                )
              }
            })()}
      
    </MyPageNavWrapper>
  )
}