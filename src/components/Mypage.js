import React, {useEffect, useState} from 'react'
import { useSelector,shallowEqual, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components';
import img from '../img/userImg.png';
import MyContentModal from '../components/MyContentModal';
import MyFavoriteModal from '../components/MyFavoriteModal';
import MypageNav from '../components/MypageNav';
import { withdrawal } from '../modules/withdrawalReducer'
import { getPickPosting } from '../modules/pickPosting';
import { localLogout } from '../modules/loginReducer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  background-image: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8) )
  ,url('https://images.unsplash.com/photo-1595981234522-aa6bae3f0dac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80');
  background-repeat: no-repeat;
  background-size: cover;
`
// 유저 정보 컨테이너
const UserInfoSection = styled.section`
  width: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
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
  font-size: 25px;
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
  margin-top : 5rem;

  &:hover{
    box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
    color: #eeeeee;
  }
`;
// 유저 콘텐츠 모음 컨테이너
const UserContentSection = styled.section`
  width: 60%;
  margin-top: 5rem;
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
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.7);
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
  &:hover{
    cursor: pointer;
  }
`;
const MyContentImg = styled.img`
  width: auto;
  height: 100%;
  padding-right: 1rem;
  transition: all 0.4s ease-in-out;
  &:hover{
    transform:scale(1.03);  
    -webkit-transform:scale(1.03);   
    -moz-transform:scale(1.03);
    -o-transform:scale(1.03);  
  }
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
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.7);
`
let index = 0;
const carousel1 = document.getElementsByClassName('carousel1'); 
const carousel2 = document.getElementsByClassName('carousel2'); 

export default function Mypage () {
  
  const dispatch = useDispatch();
  const history = useHistory();
    
  const [myCtModal, setMyCtModal] = useState(false);
  const [favoCtModal, setFavoCtModal] = useState(false);
  const {userId,profileImg,favorite,id,uploadList} = useSelector(state => ({
    userId : state.loginReducer.user.userId,
    profileImg : state.loginReducer.user.profileImg,
    favorite: state.loginReducer.user.favorite,
    id : state.loginReducer.login.userKey,
    uploadList: state.loginReducer.user.uploadList
  }),
  shallowEqual
  ); 

  const { accessToken } = useSelector(state => ({
    accessToken : state.loginReducer.login.accessToken,
  })); 
  // 내 콘텐트 모달 열기
  const myContentOpenHandler = async(e) => {
    const postId = e.target.id;
    setMyCtModal(true);
    await dispatch(getPickPosting(postId));
  }
  // 콘텐츠 모달 외부 클릭 시 닫기
  const handleMyCtModalOff = (e) => {
    const clicked = e.target.closest('.myCtModal');
    if (clicked) return;
    else {
      setMyCtModal(false);
    }
  };
  const myFavoriteOpenHandler = async(e) => {
    const postId = e.target.id;
    setFavoCtModal(true);
    await dispatch(getPickPosting(postId));
  }
  // 콘텐츠 모달 외부 클릭 시 닫기
  const handleFavoCtModalOff = (e) => {
    const clicked = e.target.closest('.myFavoCtModal');
    if (clicked) return;
    else {
      setFavoCtModal(false);
    }
  };
  const photoList = uploadList.filter((e) => e.status === true)
  //  Mycontent이전 버튼
  const onPrev = () => {
    if (index === 0) return; 
    index -= 1; 
    carousel1[0].style['transform'] = `translate3d(-${800 * index}px, 0, 0)`; 
  }
  // Mycontent다음 버튼
  const onNext = () => {
    if (index === 2) return; 
    index += 1; 
    carousel1[0].style['transform'] = `translate3d(-${800 * index}px, 0, 0)`; 
  } 
  //  MyFavorite이전 버튼
  const onPrev2 = () => {
    if (index === 0) return; 
    index -= 1; 
    carousel2[0].style['transform'] = `translate3d(-${800 * index}px, 0, 0)`; 
  }
  // MyFavorite다음 버튼
  const onNext2 = () => {
    if (index === 2) return; 
    index += 1; 
    carousel2[0].style['transform'] = `translate3d(-${800 * index}px, 0, 0)`; 
  } 
  const handleWithdrawal = () => { 
    dispatch(withdrawal(id))
    alert("회원 탈퇴가 완료되었습니다.")
    history.push('./')
    logout()
  }
  // user logout 
  const logout = () => {
    dispatch(localLogout(accessToken))
    history.push('./')
  }
  // 프로필 업데이트 핸들러
  const updateProfileHandler = () => {

  }

  return (
    <>
    <Container>
      <MypageNav logout={logout}/>
      <ProfileSection>
        <UserInfoSection>
          <UserProfileBox>
            <UserImage src={ profileImg === undefined ? img : profileImg }/> 
          </UserProfileBox>
          <UserNameText>{userId}</UserNameText>
          <Link to='/profileupdate'>
            <UpdateInfoButton onClick={() => updateProfileHandler()}>EDIT</UpdateInfoButton>
          </Link>
          <WithdrawalButton onClick={() => handleWithdrawal()}>Withdrawal</WithdrawalButton>
        </UserInfoSection>
        <UserContentSection>
          <UserTextBox>
          <Title>My Content</Title>
            <SlideWrapper>
              <SliderBtn onClick={() => onPrev()}></SliderBtn>
              <Wrapper>
                <StyledSlider className='carousel1'>
                  { 
                  // test77 로 로그인해야함.
                  // 이외 모든 계정은 마이페이지 누를 시 에러발생
                  photoList.length === 0 ? 
                  <p style={{margin:'0 auto'}}>No Contents</p> :
                  photoList.map((e, index) => {
                    return <MyContentImg id={e._id} onClick={(e) => myContentOpenHandler(e)} key={index} src={e.image[0]} loading="lazy" />
                  })
                  }
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
                  {
                    favorite.length === 0 ? 
                    <p style={{margin:'0 auto'}}>No Contents</p> :
                    favorite.map((e, index) => {
                      return <MyContentImg id={e._id} onClick={(e) => myFavoriteOpenHandler(e)} key={index} src={e.image[0]} loading="lazy" />
                    })
                  }
                </StyledSlider>
              </Wrapper>
              <SliderBtn onClick={() => onNext2()}></SliderBtn>
            </SlideWrapper>
          </UserFavoriteBox>
        </UserContentSection>
      </ProfileSection>
      <MyContentModal
        logout={logout}
        handleMyCtModalOff={handleMyCtModalOff}
        myCtModal={myCtModal}
        setMyCtModal={setMyCtModal}
        >
      </MyContentModal>
      <MyFavoriteModal
        handleFavoCtModalOff={handleFavoCtModalOff}
        favoCtModal={favoCtModal}
        setFavoCtModal={setFavoCtModal}
        >
      </MyFavoriteModal>
    </Container>
   </>
  );
}

