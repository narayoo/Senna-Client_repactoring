import React from 'react';
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
  z-index: 1;
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
  /* padding: 4rem 2rem 2rem 1rem; */
  padding-right: 1.2rem;
  padding-bottom: 0.5rem;
  
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
  padding: 5%;
  cursor: pointer;

`

const FavortiteUncheck = styled.i`
  color : #1b1b1b;
  transition: transform 300ms ease;
`

const FavortiteCheck = styled.i`
  color: red;
  transition: transform 300ms ease;
`


export default function ContentModal({ ctModal, handleCtModalOff , handleLikeButton , likeButton, handleDeleteButton, isLogin }) {
  if (!ctModal) return null;

  return(
    <>
    {ctModal && (
      <BackgroundDark onClick={(e) => handleCtModalOff(e)}>
        <ContentModalDiv className='ctModal'>
          <ContentSlider />
            <ContentsWrapper >
              <FavoriteCheckWrapper >
                  <>
                    {likeButton ? 
                        <FavortiteCheck className='fas fa-heart fa-2x' onClick={() => {
                          return (
                             <>
                              {isLogin ? handleDeleteButton()
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
              내 어머니는 성취와 성공의 차이를 분명히 하셨다. 
              어머니는 말씀하셨다. 
              '성취란 네가 열심히 공부하고 일했으며 네가 가진 최선을 다했다는 인식이다. 
              성공은 남들에게 추앙받는 것이며, 이것이 멋진 일이긴 하나 그렇게 중요하거나 만족을 주는 것은 아니다. 
              항상 성취를 목적으로 삼고 성공에 대해선 잊어라.'
              <br />
              <br />
              'My mother drew a distinction between achievement and success. 
              She said that 'achievement is the knowledge that you have studied and worked hard and done the best that is in you. 
              Success is being praised by others, and that's nice, too, but not as important or satisfying. 
              Always aim for achievement and forget about success.'
            </ContentText>
            <HashTagWrapper>
              <HashTag>#한국</HashTag>
              <HashTag>#부산</HashTag>
            </HashTagWrapper>
          </ContentTextArea>
          </ContentsWrapper>
        </ContentModalDiv>
      </BackgroundDark>
    )}
    </>
  )
}
