import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector,shallowEqual } from 'react-redux';
import styled from 'styled-components';
import logo from '../img/SennaLogo.png';
import img from '../img/userImg.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const MyPageNav = styled.div`
  display: flex;
  justify-content: space-between;
`;
// 로고 
const Logo = styled.img`
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
  background: none;
  border: none;
  font-size: 15px;
  margin-right: 30px;
  
  &:hover {
    cursor: pointer;
  }
`;
// 마이페이지 컨테이너
const ProfileSection = styled.section`
  padding-top: 1rem;
  padding-left: 5rem;
  padding-right: 5rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
`
// 유저 정보 컨테이너
const UserInfoSection = styled.section`
  width: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
// 유저 프로필 박스 랩퍼
const UserProfileBox = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 8px 8px 8px 8px rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;
// 유저 이미지
const UserImage = styled.img`
  width: 100%;
  height: auto;
`;
// 유저 이름
const UserNameText = styled.p`
  font-size: 20px;
  color: #eeeeee;
`;
// 회원정보 업데이트 버튼 
const UpdateInfoButton = styled.button`
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
`
// 회원 탈퇴 버튼
const WithdrawalButton = styled.a`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #eeeeee;
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;
  outline: none;
  margin-top : 4rem;

  &:hover{
    box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
    color: #eeeeee;
  }
`;
// 유저 콘텐츠 모음 컨테이너
const UserContentSection = styled.section`
  width: 60%;
`;
// 유저 콘텐트 모음
const UserTextBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  padding-bottom: 2rem;
  border: 1px solid rgba(238, 238, 238, 0.5);
`
const SlideWrapper = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;
const Wrapper = styled.div`//carousel-wrapper
  display: flex;
  width: 100%; 
  overflow: hidden;
`;
const StyledSlider = styled.div` //carousel
  display: flex;
  width: 100%;
  align-items: center;
  text-align: center;
  transform: translate3d(0, 0, 0); 
  transition: transform 0.7s;
`;
const MyContentImg = styled.img`
  width: auto;
  height: 100%;
  padding-right: 1rem;
`
const SliderBtn = styled.button`
  display: flex;
  width: 2rem;
  color: #cfcfcf;
  font-size: 50px;
  align-items: center;
  background: transparent;
  border: none;
  transition: all 0.5s ease 0s;
  &:hover{
    background: #e0e0e0;
    cursor: pointer;
  }
`;
const Title = styled.p`
  font-size: 20px;
  color: #eeeeee;
  margin-left: 2rem;
`;
// 유저 좋아요 모음
const UserFavoriteBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  overflow: hidden;
  border: 1px solid rgba(238, 238, 238, 0.5);
  padding-bottom: 2rem;
`
let index = 0;
const carousel1 = document.getElementsByClassName('carousel1'); 
const carousel2 = document.getElementsByClassName('carousel2'); 

export default function Mypage () {

  const isLogin = useSelector(state => state.loginReducer.login.isLogin);

  const {userId,profileImg,favorite} = useSelector(state => ({
    userId : state.loginReducer.user.userId,
    profileImg : state.loginReducer.user.profileImg,
    favorite: state.loginReducer.user.favorite,
  }),
  shallowEqual
  ); 

  console.log( 'userId:',userId)
  console.log( 'profileImg:',profileImg)
  console.log( 'favorite:',favorite)
  const photoList = favorite.map((e, index) =>
    <MyContentImg key={index} src={e} loading="lazy" />
  )

  // Logo 클릭 시 메인화면 새로고침 이동
  const clickLogo = () => {
    window.location.replace("/")
  }
  //  이전 버튼
  const onPrev = () => {
    if (index === 0) return; 
    index -= 1; 
    carousel1[0].style['transform'] = `translate3d(-${800 * index}px, 0, 0)`; 
  }
  // 다음 버튼
  const onNext = () => {
    if (index === 2) return; 
    index += 1; 
    carousel1[0].style['transform'] = `translate3d(-${800 * index}px, 0, 0)`; 
  } 
  //  이전 버튼
  const onPrev2 = () => {
    if (index === 0) return; 
    index -= 1; 
    carousel2[0].style['transform'] = `translate3d(-${800 * index}px, 0, 0)`; 
  }
  // 다음 버튼
  const onNext2 = () => {
    if (index === 2) return; 
    index += 1; 
    carousel2[0].style['transform'] = `translate3d(-${800 * index}px, 0, 0)`; 
  } 

  return (
    <>
    <Container>
      <MyPageNav>
        <Link to='./'>
          <Logo src={logo} onClick={clickLogo}/>
        </Link>
        <NavButton >Logout</NavButton>
      </MyPageNav>
      <ProfileSection>
        <UserInfoSection>
          <UserProfileBox>
            <UserImage src={ profileImg === undefined ? img : profileImg }/> 
          </UserProfileBox>
          <UserNameText>{userId}</UserNameText>
          <UpdateInfoButton>EDIT</UpdateInfoButton>
          <WithdrawalButton>Withdrawal</WithdrawalButton>
        </UserInfoSection>
        <UserContentSection>
          <UserTextBox>
          <Title>My Content</Title>
            <SlideWrapper>
              <SliderBtn onClick={() => onPrev()}></SliderBtn>
              <Wrapper>
                <StyledSlider className='carousel1'>
                  {photoList}
                </StyledSlider>
              </Wrapper>
              <SliderBtn onClick={() => onNext()}></SliderBtn>
            </SlideWrapper>
          </UserTextBox >
          <UserFavoriteBox>
            <Title>My Favorite</Title>
            <SlideWrapper>
              <SliderBtn onClick={() => onPrev2()}></SliderBtn>
              <Wrapper>
                <StyledSlider className='carousel2'>
                  {photoList}
                </StyledSlider>
              </Wrapper>
              <SliderBtn onClick={() => onNext2()}></SliderBtn>
            </SlideWrapper>
          </UserFavoriteBox>
        </UserContentSection>
      </ProfileSection>
    </Container>
   </>
  );
}

