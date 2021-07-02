import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import styled from 'styled-components';
import ContentSlider from './ContentSlider';


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
// content text area css
const ContentTextArea = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 2rem;
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
// 좋아요아이콘 
const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
` 
const FavoriteCheckWrapper = styled.div`
  text-align: right;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 2rem;
  cursor: pointer;
  font-size: 12px;
`
const FavortiteUncheck = styled.i`
  color : gray;
  transition: transform 300ms ease;
`
const FavortiteCheck = styled.i`
  color: red;
  transition: transform 300ms ease;
`

function ContentModal({ ctModal, handleCtModalOff, handleLikeButton, handleUnLikeButton}) {

  const isLogin = useSelector(state => state.loginReducer.login.isLogin)
  const userlikeButton = useSelector(state => state.favoriteButtonReducer.like)
  const { content, hashtag, image } = useSelector(state => ({
    content: state.pickPosting.postInfo.content,
    hashtag: state.pickPosting.postInfo.hashtag,
    image: state.pickPosting.postInfo.image,
  })); 

  if (!ctModal) return null;

  return(
    <>
    {ctModal && (
      <BackgroundDark onClick={(e) => handleCtModalOff(e)}>
        <ContentModalDiv className='ctModal'>
          <ContentSlider image={image}/>
            <ContentsWrapper >
              <FavoriteCheckWrapper >
                  <>
                    { userlikeButton ? 
                        <FavortiteCheck className='fas fa-heart fa-2x' onClick={() => {
                          return (
                              <>
                              {isLogin ? handleUnLikeButton()
                                : 
                                  alert('로그인 후 이용 가능합니다.')
                                }
                              </>
                          )
                        }} />
                        :
                        <FavortiteUncheck className='far fa-heart fa-2x' onClick={() => {
                          return (
                            <>
                              {isLogin ? handleLikeButton()
                              : 
                                alert('로그인 후 이용 가능합니다.')

                              }
                            </>
                          )
                        }} />
                    }
                    </>                   
              </FavoriteCheckWrapper>
            <ContentTextArea>
            <ContentText>
              {content}
            </ContentText>
            <HashTagWrapper>
              {hashtag.map((e) => {
                <HashTag>{e}</HashTag>
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