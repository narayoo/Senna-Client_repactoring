import React, { useState, useEffect } from 'react'
import { useSelector,shallowEqual, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components';
import img from '../img/userImg.png';
import MyContentModal from '../components/MyContentModal';
import MyFavoriteModal from '../components/MyFavoriteModal';
import MypageNav from '../components/MypageNav';
import { withdrawal , kakaoUserWithdrawal} from '../modules/withdrawalReducer'
import { getPickPosting } from '../modules/pickPosting';
import { localLogout, autoRefreshLogin} from '../modules/loginReducer';
import { kakaoLogout, autoRefreshKakaoLogin } from '../modules/kakaoReducer'
import jwt_decode from 'jwt-decode';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
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
  @media all and (max-width:767px) {
    flex-direction: column;
    background-image: none;
    background-size: 0px;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 0rem;
  } 
`;
const UserInfoSection = styled.section`
  width: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  @media all and (min-width:768px) and (max-width:1023px) { 
    margin-right: 3rem;
  }
  @media all and (max-width:767px) {
    width: 100%;
    margin-top: 6rem;
  } 
`;
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
  @media all and (max-width:767px) {
    width: 150px;
    height: 150px;
  }
`;
const UserImage = styled.img`
  width: 100%;
  height: auto;
`;
const UserNameText = styled.p`
  font-size: 25px;
  color: #eeeeee;
`;
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
`;
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
  @media all and (max-width:767px) {
    margin-top: 0;
  }
`;
const UserContentSection = styled.section`
  width: 60%;
  margin-top: 5rem;
  
  @media all and (max-width:767px) {
    width: 100%;
    height: 100%;
    margin-top: 4rem;
  }
`;
const UserTextBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  padding-bottom: 2rem;
  border: 1px solid rgba(238, 238, 238, 0.5);
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.7);
  @media all and (max-width:767px) {
    height: 50%;
    flex-direction: column;
    border: 1px solid rgba(238, 238, 238, 0.2);
  }
`;
const SlideWrapper = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%; 
  overflow: hidden;
`;
const StyledSlider = styled.div`
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
`;
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
const UserFavoriteBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  overflow: hidden;
  border: 1px solid rgba(238, 238, 238, 0.5);
  padding-bottom: 2rem;
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.7);
  @media all and (max-width:767px) {
    height: 50%;
    flex-direction: column;
    border: 1px solid rgba(238, 238, 238, 0.2);
  }
`;
const {Kakao} = window;
const Mypage = React.memo( ( ) => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const [kakaoAT , setkakaoAT] = useState('');
  const [myCtModal, setMyCtModal] = useState(false);
  const [favoCtModal, setFavoCtModal] = useState(false);
  const [postLoading, setPostLoading ] = useState(null);
  const {userId,profileImg,favorite,id,uploadList} = useSelector(state => ({
    userId : state.loginReducer.user.userId,
    profileImg : state.loginReducer.user.profileImg,
    favorite: state.loginReducer.user.favorite,
    id : state.loginReducer.login.userKey,
    uploadList: state.loginReducer.user.uploadList
  }),
  shallowEqual
  ); 
  const {kakaoUserId, kakaoProfileImg, kakaoFavorite, kakaoId, kakaoUploadList} = useSelector(state => ({
    kakaoUserId : state.kakaoReducer.user.userId,
    kakaoProfileImg : state.kakaoReducer.user.profileImg,
    kakaoFavorite : state.kakaoReducer.user.favorite,
    kakaoId : state.kakaoReducer.login.userKey,
    kakaoUploadList : state.kakaoReducer.user.uploadList
  }),
  shallowEqual
  );
  const isLogin = useSelector(state => state.loginReducer.login.isLogin)
  const kakaoIsLogin = useSelector(state => state.kakaoReducer.login.isLogin)
  const localAT = useSelector(state => state.kakaoReducer.login.localToken);
  const { accessToken } = useSelector(state => ({
    accessToken : state.loginReducer.login.accessToken,
  })); 
  const kakaoAcToken = useSelector(state => state.kakaoReducer.login.accessToken)

    useEffect(async() => {
      let now = new Date()
      if (accessToken !== undefined && !kakaoAcToken) {
        let newAccessToken = accessToken.split(' ')[1];
        let decoded = jwt_decode(newAccessToken)
        let expiry = decoded.exp - Number(now.getTime().toString().substr(0, 10));
        if(expiry < 10){
          return  await dispatch(autoRefreshLogin())
        }
       } else if (kakaoAcToken !== undefined && !accessToken) {
        let newKakaoAccessToken = kakaoAcToken.split(' ')[1];
        let decodedKakao = jwt_decode(newKakaoAccessToken)
        let kakaoExpiry = decodedKakao.exp - Number(now.getTime().toString().substr(0, 10));
        if (kakaoExpiry < 10 ){
          return await dispatch(autoRefreshKakaoLogin())
        }
      }
    });
  const myContentOpenHandler = async(e) => {
    const postId = e.target.id;
    setMyCtModal(true);
    setPostLoading(true);
    await dispatch(getPickPosting(postId));
    setPostLoading(false);
  };
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
    setPostLoading(true);
    await dispatch(getPickPosting(postId));
    setPostLoading(false);
  };
  const handleFavoCtModalOff = (e) => {
    const clicked = e.target.closest('.myFavoCtModal');
    if (clicked) return;
    else {
      setFavoCtModal(false);
    }
  };
  const photoList = uploadList.filter((e) => e.status === true)
  const kakaoPhotoList = kakaoUploadList.filter((e) => e.status === true)
  const carousel1 = document.getElementsByClassName('carousel1'); 
  const carousel2 = document.getElementsByClassName('carousel2'); 
  let index = 0;

  const onPrev = () => {
    if (index === 0) return; 
    index -= 1; 
    carousel1[0].style['transform'] = `translate3d(-${800 * index}px, 0, 0)`; 
  };
  const onNext = () => {
    if (index === 100) return; 
    index += 1; 
    carousel1[0].style['transform'] = `translate3d(-${800 * index}px, 0, 0)`; 
  };
  const onPrev2 = () => {
    if (index === 0) return; 
    index -= 1; 
    carousel2[0].style['transform'] = `translate3d(-${800 * index}px, 0, 0)`; 
  };
  const onNext2 = () => {
    if (index === 100) return; 
    index += 1; 
    carousel2[0].style['transform'] = `translate3d(-${800 * index}px, 0, 0)`; 
  };
  const handleWithdrawal = () => { 
    dispatch(withdrawal(id))
    alert("회원 탈퇴가 완료되었습니다.")
    history.push('./')
    logout()
  };
  const logout = async() => {
      await dispatch(localLogout(accessToken))
      history.push('./')
  };
  const updateProfileHandler = () => {
    history.push('/profileupdate')
  };
  const kakaoWidrawalHandler = async () => {
    await dispatch(kakaoUserWithdrawal(kakaoId))
    alert("회원 탈퇴가 완료되었습니다.")
    history.push('./')
    kakaoLogoutHandler()
  };
  const kakaoLogoutHandler = () => {
      dispatch(kakaoLogout(kakaoAT, localAT))
      history.push('./')
  };
  const onSocialLogin = () => {
    Kakao.Auth.login({
      success: function(authObj) {
        let ac = authObj.access_token;
        let socialAC = `Bearer ${ac}`;
        setkakaoAT(socialAC)
      },
      fail: function(err) {
      },
    })
  };

  return (
    <>
    <Container>
      <MypageNav logout={logout} kakaoLogoutHandler={kakaoLogoutHandler} kakaoAt={kakaoAT} onSocialLogin={onSocialLogin}/>
      <ProfileSection>
        <UserInfoSection>
          <UserProfileBox>
            {
              (() => {
                if(isLogin){
                  return(
                    <UserImage src={ profileImg === undefined ? img : profileImg } />
                  )
                } else if (kakaoIsLogin){
                  return (
                    <UserImage src={ kakaoProfileImg === undefined ? img : kakaoProfileImg } />
                  )
                }
              })()
            }
            
          </UserProfileBox>
          <UserNameText>
            {(()=> {
              if(isLogin){
                return userId
              } else if (kakaoIsLogin){
                return kakaoUserId
              }
            })()}
            </UserNameText>
          <Link to='/profileupdate'>
            <UpdateInfoButton onClick={() => updateProfileHandler()}>EDIT</UpdateInfoButton>
          </Link>
          {(()=> {
              if(isLogin){
                return (
                  <WithdrawalButton onClick={() => handleWithdrawal()}>Withdrawal</WithdrawalButton>
                )
              } else if (kakaoIsLogin){
                return (
                  <WithdrawalButton onClick={() => kakaoWidrawalHandler()}>Withdrawal</WithdrawalButton>
                )
              }
            })()}
         
        </UserInfoSection>
        <UserContentSection>
          <UserTextBox>
          <Title>My Content</Title>
            <SlideWrapper>
              <SliderBtn onClick={() => onPrev()}></SliderBtn>
              <Wrapper>
                {
                  (()=> {
                    if(isLogin){
                      return(    
                        <>                  
                      <StyledSlider className='carousel1'>
                      { 
                      photoList.length === 0 ? 
                      <p style={{margin:'0 auto'}}>No Contents</p> :
                      photoList.map((e, index) => {
                        return <MyContentImg id={e._id} onClick={(e) => myContentOpenHandler(e)} key={index} src={e.image[0]} loading="lazy" />
                      })
                      }
                    </StyledSlider>
                    </>
                    )} else if (kakaoIsLogin){
                      return( 
                        <>                     
                      <StyledSlider className='carousel1'>
                      { 
                      kakaoPhotoList.length === 0 ? 
                      <p style={{margin:'0 auto'}}>No Contents</p> :
                      kakaoPhotoList.map((e, index) => {
                        return <MyContentImg id={e._id} onClick={(e) => myContentOpenHandler(e)} key={index} src={e.image[0]} loading="lazy" />
                      })
                      }
                     </StyledSlider>
                     </>
                     )}
                  })()
                }
              </Wrapper>
              <SliderBtn onClick={() => onNext()}></SliderBtn>
            </SlideWrapper>
          </UserTextBox >
          <UserFavoriteBox>
            <Title>My Favorite</Title>
            <SlideWrapper>
              <SliderBtn onClick={() => onPrev2()}></SliderBtn>
              <Wrapper>
              {(()=> {
              if(kakaoIsLogin){
                return (
                  <>
                  <StyledSlider className='carousel2'>
                  {
                    kakaoFavorite.length === 0 ? 
                    <p style={{margin:'0 auto'}}>No Contents</p> :
                    kakaoFavorite.map((e, index) => {
                      return <MyContentImg id={e._id} onClick={(e) => myFavoriteOpenHandler(e)} key={index} src={e.image[0]} loading="lazy" />
                    })
                  }
                </StyledSlider>
                </>
                )
              } else if (isLogin){
                return (
                  <>
                  <StyledSlider className='carousel2'>
                  {
                    favorite.length === 0 ? 
                    <p style={{margin:'0 auto'}}>No Contents</p> :
                    favorite.map((e, index) => {
                      return <MyContentImg id={e._id} onClick={(e) => myFavoriteOpenHandler(e)} key={index} src={e.image[0]} loading="lazy" />
                    })
                  }
                </StyledSlider>
                </>
                )
              }
              })()}
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
})

export default Mypage;