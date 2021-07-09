import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import styled from 'styled-components';
import ContentSlider from './ContentSlider';
import {likeButton, kakaoLikeButton} from '../modules/likeReducer'


// 모달 뒷배경
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
// content modal div
const ContentModalDiv = styled.div`
  max-width: 900px;
  min-width: 750px;
  width: 60%;
  height: 600px;
  background-color: #f5f5f5;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: row;
`;
// 좋아요아이콘 
const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 19em;
` 
// content text area css
const ContentTextArea = styled.div`
  height: 100%;
  padding-top: 1rem;
  padding-right: 1.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
`;
// content text css
const ContentText = styled.div`
  width: 100%;
  height: 70%;
  border: none;
  color: #1b1b1b;
  overflow-y: scroll;
  &:focus {
  outline:none;
  }
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
// 해시태그 
const HashTagWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20%;
`;
// 해시태그
const HashTag = styled.p`
  color: #1b1b1b;
  width: 30%;
`;

const FavoriteCheckWrapper = styled.div`
  text-align: right;
  padding-top: 1.5rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  cursor: pointer;
  font-size: 12px;
`

const ContentModal = (({ ctModal, handleCtModalOff, heart, setHeart}) => {

  const dispatch = useDispatch();
  
  const { isLogin, userKey} = useSelector(state => ({
    isLogin : state.loginReducer.login.isLogin,
    userKey : state.loginReducer.login.userKey,
  })); 

  const kakaoIsLogin = useSelector(state => state.kakaoReducer.login.isLogin)
  const kakaoUserKey = useSelector(state => state.kakaoReducer.login.userKey)

  const { content, hashtag, image, postId, likeUser } = useSelector(state => ({
    content: state.pickPosting.postInfo.content,
    hashtag: state.pickPosting.postInfo.hashtag,
    image: state.pickPosting.postInfo.image,
    postId : state.pickPosting.postInfo.postId,
    likeUser : state.pickPosting.postInfo.likeUser,
  })); 
  // likebutton click event
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
  }

  if (!ctModal) return null;

  return(
    <>
    {ctModal && (
      <BackgroundDark onClick={(e) => handleCtModalOff(e)}>
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
                <ContentText>
                  {content}
                </ContentText>
                <HashTagWrapper>
                {hashtag.map((e, index) => {
                  return <HashTag key={index}>{`#${e}`}</HashTag>
                })}
              </HashTagWrapper>
            </ContentTextArea>
          </ContentsWrapper>
        </ContentModalDiv>
      </BackgroundDark>
    )}
    </>
  )
})
export default ContentModal;