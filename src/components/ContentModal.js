import React, { useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import styled from 'styled-components';
import ContentSlider from './ContentSlider';
import {likeButton, unLikeButton} from '../modules/likeReducer'


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
  z-index: 2;
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
  padding-top: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
`;
// content text css
const ContentText = styled.div`
  width: 100%;
  height: 80%;
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


function ContentModal({ ctModal, handleCtModalOff, heart, setHeart}) {

  const dispatch = useDispatch();
  
  const { isLogin, userKey, userId } = useSelector(state => ({
    isLogin : state.loginReducer.login.isLogin,
    userKey : state.loginReducer.login.userKey,
    userId : state.loginReducer.login.userId,
  })); 

  const { content, hashtag, image, postId, likeUser } = useSelector(state => ({
    content: state.pickPosting.postInfo.content,
    hashtag: state.pickPosting.postInfo.hashtag,
    image: state.pickPosting.postInfo.image,
    postId : state.pickPosting.postInfo.postId,
    likeUser : state.pickPosting.postInfo.likeUser,
  })); 

  const { likeState } = useSelector(state => ({
    likeState: state.likeReducer.like
  }))
  // likebutton click event
  const handleLikeButton = (e) => {
    const like = e.target.id;
    setHeart(true);
    dispatch(likeButton(like, userKey))
  }
    
  // unlikebutton click event
  const handleUnLikeButton = (e) =>{
    const unlike = e.target.id;
    setHeart(false);
    dispatch(unLikeButton(unlike, userKey))
  }


  if(likeUser.includes(userId)){// 지금 로그인된 유저가 해당 포스팅좋아요 유저에 포함되어있다면 true
    setHeart(true);
  }else{
    setHeart(false);
  }

  if (!ctModal) return null;
  return(
    <>
    {console.log('likeUser',likeUser)}
    {ctModal && (
      <BackgroundDark onClick={(e) => handleCtModalOff(e)}>
        <ContentModalDiv className='ctModal'>
          <ContentSlider image={image}/>
            <ContentsWrapper >
              <FavoriteCheckWrapper >
               {
                <i 
                  id={postId} 
                  className={heart ? "fas fa-heart fa-2x" : "far fa-heart fa-2x"}
                  style={heart ? {color : 'red', cursor:'pointer'} : {color : 'gray', cursor:'pointer'}} 
                  onClick={(e) => {
                  return (
                      <>
                      {!isLogin ? alert('로그인 후 이용 가능합니다.')
                        : heart? 
                        handleUnLikeButton(e) :
                        handleLikeButton(e)
                        }
                      </>
                    )
                  }}/>
                }
              </FavoriteCheckWrapper>  
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
}



export default ContentModal