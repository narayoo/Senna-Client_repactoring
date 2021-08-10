import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import styled from 'styled-components';
import ContentSlider from './ContentSlider';
import {likeButton, kakaoLikeButton} from '../modules/likeReducer'
import Loading from './Loading';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';

const {Kakao} = window;
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
  z-index: 3;
`;
const ContentModalDiv = styled.div`
  max-width: 900px;
  min-width: 750px;
  width: 60%;
  height: 600px;
  background-color: #f5f5f5;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: row;

  @media all and (min-width:768px) and (max-width:1023px) { 
    height: 550px;
  }
  @media all and (max-width:767px) {
    flex-direction: column;
    min-width: 350px;
    height: 550px;
  }
`;
const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 19em;
  @media all and (max-width:767px) {
    width: 100%;
  }
`;
const ContentTextArea = styled.div`
  height: 100%;
  padding-top: 1rem;
  padding-right: 1.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  @media all and (max-width:767px) {
    padding: 0rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    overflow: scroll;
    height: 15%;
    min-height: 50px;
  }
`;
const ContentText = styled.textarea`
  width: 100%;
  height: 70%;
  border: none;
  color: #1b1b1b;
  overflow-y: scroll;
  background-color: #f5f5f5;
  font-size: 1rem;
  &:focus {
    outline:none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  @media all and (min-width:768px) and (max-width:1023px){
    height: 100%;
  }
  @media all and (max-width:767px) {
    height: 100%;
  }
`;
const HashTagWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 10%;
  padding-right: 1.5rem;
  @media all and (max-width:767px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
const HashTag = styled.p`
  color: #1b1b1b;
  width: 100%;
  @media all and (min-width:768px) and (max-width:1023px){
    width: 100%;
  }
  @media all and (max-width:767px) {
    width: 30%;
    margin-top: 1.5rem;
  }
`;
const PlaceWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 20%;
  margin-bottom: 1rem;
  @media all and (max-width:767px) {
    padding-left: 2rem;
    padding-right: 2rem;
    height: 10%;
  }
  
`;
const Place = styled.p`
  color: #1b1b1b;
  font-size: 13px;
  padding-right: 1.5rem;
  @media all and (min-width:768px) and (max-width:1023px){
  width: 100%;
  }
`;
const FavoriteCheckWrapper = styled.div`
  text-align: right;
  padding-top: 1.5rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  cursor: pointer;
  font-size: 12px;
  @media all and (max-width:767px) {
    padding-right: 2rem;
    padding-bottom: 1rem;
  }
`;
const KakaoShare = styled.div`
 display: flex;
 justify-content: flex-end;
 margin-right: 20px;
 @media all and (max-width:767px) {
  justify-content: flex-end;
 }
`;
const KakaoShareWrapper = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  margin-bottom: 1rem;
  cursor: pointer;
  @media all and (max-width:767px) {
    margin-bottom: 0rem;
  }
`;
const ContentModal = (({ ctModal, handleCtModalOff, heart, setHeart, postLoading }) => {
  const dispatch = useDispatch();
  const { isLogin, userKey} = useSelector(state => ({
    isLogin : state.loginReducer.login.isLogin,
    userKey : state.loginReducer.login.userKey,
  })); 
  const kakaoIsLogin = useSelector(state => state.kakaoReducer.login.isLogin)
  const kakaoUserKey = useSelector(state => state.kakaoReducer.login.userKey)
  const { content, hashtag, image, postId, place } = useSelector(state => ({
    content: state.pickPosting.postInfo.content,
    hashtag: state.pickPosting.postInfo.hashtag,
    image: state.pickPosting.postInfo.image,
    postId : state.pickPosting.postInfo.postId,
    place : state.pickPosting.postInfo.place
  })); 

  const handleLikeButton = async(e) => {
    const like = e.target.id;
    if(isLogin && heart === null) {
      await dispatch(likeButton(like, userKey))
      setHeart('like');
    }else if (kakaoIsLogin && heart === null) {
      await dispatch(kakaoLikeButton(like, kakaoUserKey))
      setHeart('like');
    }else if(heart === 'like') {
      alert('이미 좋아요한 게시물입니다.')
    }
  };
  const KakaoShareHandler = () => {
    Kakao.Link.createDefaultButton({
      container: '#create-kakao-link-btn',
      objectType: 'feed',
      content: {
        title: 'Senna, 사진을 타고 날아가는',
        description: `${hashtag}`,
        imageUrl: image[0],
        link: {
          webUrl: 'https://senna.world',
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            webUrl: 'https://senna.world',
          },
        },
      ],
    })
  }

  if (!ctModal) return null;

  return(
    <>
    {ctModal && (
      <BackgroundDark onClick={(e) => handleCtModalOff(e)}>
        {
          postLoading ?
          <Loading /> :
        <ContentModalDiv className='ctModal'>
          <ContentSlider image={image}/>
            <ContentsWrapper >
            {(()=> {
              if(isLogin){
                return (
                  <FavoriteCheckWrapper >
                  {
                   <i 
                     id={postId} 
                     className={heart === 'like' ? "fas fa-heart fa-2x" : "far fa-heart fa-2x"}
                     style={heart === 'like' ? {color : 'red', cursor:'pointer'} : {color : 'gray', cursor:'pointer'}} 
                     onClick={(e) =>{
                       ! isLogin ? alert('로그인 후 이용 가능합니다.') : handleLikeButton(e)}
                     } 
                     />
                   }
                 </FavoriteCheckWrapper>  
                )
              } else if (kakaoIsLogin){
                return (
                  <FavoriteCheckWrapper >
                  {
                   <i 
                     id={postId} 
                     className={heart === 'like' ? "fas fa-heart fa-2x" : "far fa-heart fa-2x"}
                     style={heart === 'like' ? {color : 'red', cursor:'pointer'} : {color : 'gray', cursor:'pointer'}} 
                     onClick={(e) =>{
                       ! kakaoIsLogin ? alert('로그인 후 이용 가능합니다.') : handleLikeButton(e)}
                     } 
                     />
                   }
                 </FavoriteCheckWrapper>  
                )
              } else if (!isLogin || !kakaoIsLogin){
                return (
                 <FavoriteCheckWrapper >
                   {
                   <i 
                     id={postId} 
                     className={heart === 'like' ? "fas fa-heart fa-2x" : "far fa-heart fa-2x"}
                     style={heart === 'like' ? {color : 'red', cursor:'pointer'} : {color : 'gray', cursor:'pointer'}} 
                     onClick={(e) =>{
                       ! kakaoIsLogin ? alert('로그인 후 이용 가능합니다.') : handleLikeButton(e)}
                     } 
                     />
                    }
                 </FavoriteCheckWrapper>
                )
              }
            })()}
            <ContentTextArea>
              <ContentText readOnly name="description" value={content}>
                {content}
              </ContentText>
            </ContentTextArea>
            <HashTagWrapper>
                {hashtag.map((e, index) => {
                  return <HashTag key={index}>{`#${e}`}</HashTag>
                })}
              </HashTagWrapper>
            <PlaceWrapper>
              <Place>{place}</Place>
              </PlaceWrapper>
            <KakaoShare onClick={()=>KakaoShareHandler()}> 
            <a id="create-kakao-link-btn" href="javascript:;" >
            <KakaoShareWrapper src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"/>
            </a>
            </KakaoShare>
          </ContentsWrapper>
        </ContentModalDiv>

        } 
      </BackgroundDark>
    )}
    </>
  )
})
export default ContentModal;