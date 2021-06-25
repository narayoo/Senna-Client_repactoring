import React from 'react';
import styled from 'styled-components';
import photo from '../img/korea4.jpeg';

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
  height: 550px;
  background-color: #f5f5f5;
  padding: 1rem;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  display: flex;
`;
// content img wrapper css
const ContentImgWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  width: 65%;
  height: 100%;
  overflow: hidden;
`;
// content img css
const ContentImg = styled.img`
  width: 100%;
`;
// content text area css
const ContentTextArea = styled.div`
  width: 35%;
  height: 100%;
  padding: 2rem;
  
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
  font-weight: bold;
  color: #1b1b1b;
  width: 30%;
`;

export default function ContentModal({ ctModal, handleCtModalOff}) {
  if (!ctModal) return null;

  return(
    <>
    {ctModal && (
      <BackgroundDark onClick={(e) => handleCtModalOff(e)}>
        <ContentModalDiv className='ctModal'>
          <ContentImgWrapper>
            <ContentImg src={photo}/>
          </ContentImgWrapper>
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
        </ContentModalDiv>
      </BackgroundDark>
    )}
    </>
  )
}
