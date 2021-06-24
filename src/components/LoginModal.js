import { darken, lighten } from 'polished';
import styled, { ThemeProvider } from 'styled-components';
// 뒷배경
const BackgroundDark = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.7);
`;
// login modal div
const LoginModalDiv = styled.div`
  width: 400px;
  height: 400px;
  background-color: #ffffff;
  border: 1px solid gray;
  padding: 1.5rem;
  border-radius: 15px;
`;
// 모달 버튼 그룹
const ButtonGroup = styled.div`
  justify-content: center;
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`;
// 모달 닫기 버튼
const CancleBtn = styled.button`
  flex-grow: 1;
  width: 40%;
  height: 40px;
  color: #f5f5f5;
  margin: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: #707070;
  font-weight: bold;
  &:hover{
    cursor: pointer;
    background: ${darken(0.1, '#707070')};
  }
`;
// 로그인버튼 
const LoginBtn = styled.button`
  flex-grow: 1;
  width: 40%;
  height: 40px;
  color: #f5f5f5; 
  margin: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: #00acc1;
  font-weight: bold;
  &:hover{
    cursor: pointer;
    background: ${lighten(0.1, '#00acc1')};
  }
`;
// 소셜 로그인 버튼
const SocialBtn = styled.button`
  flex-grow: 2;
  width: 100%;
  height: 40px;
  color: #1b1b1b; 
  margin: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: #fef01b;
  font-weight: bold;
  &:hover{
    cursor: pointer;
    background: ${darken(0.1, '#fef01b')};
  }
`;
// 로그인 인풋
const LoginInput = styled.input`
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  width: 70%;
  height: 30px;
  display: flex;
  margin: 0 auto;
  margin-top: 1rem;
  color: #1b1b1b;
  padding-left: 10px;
  &:focus {
  background: none;
  background-color: #ffffff;
  box-shadow: none;
  outline:none;
}
  `;
// 모달 타이틀
const Title = styled.p`
  color: #424242;
  font-size: 1.4rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 3rem;
`
export default function LoginModal({ }) {
  return(
    <BackgroundDark>
      <LoginModalDiv>
        <Title>Login</Title>
        <LoginInput placeholder='Write your ID'/>
        <LoginInput placeholder='Write your Password'/>
        <ButtonGroup>
          <CancleBtn>Cancle</CancleBtn>
          <LoginBtn>Login</LoginBtn>
          <SocialBtn>Kakao Login</SocialBtn>
        </ButtonGroup>
      </LoginModalDiv>
    </BackgroundDark>
  )
}
