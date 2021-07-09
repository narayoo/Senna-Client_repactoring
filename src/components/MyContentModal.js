import React, { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import ContentSlider from './ContentSlider';
import { onDeleteMypost, onDeleteKakaoMypost }from '../modules/deleteMyPosting';
import { getUserInfo } from '../modules/loginReducer';
import { getKakaoUserInfo } from '../modules/kakaoReducer'


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
  margin-right: 2rem;
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
// 버튼 래퍼
const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
// 내 콘텐츠 업데이트 버튼
const UpdateBtn = styled.button`
  width: 100px;
  height: 37px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #1b1b1b;
  border: 1px solid #00acc1;
  background-color: #eeeeee;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: none;
  margin-bottom: 2rem;
  margin-left: 1rem;
  &:hover{
    border: none;
    color: #eeeeee;
    background-color: #00acc1;
    box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
  }
`
// 내 콘텐츠 삭제 버튼
const DeleteBtn = styled.button`
  width: 100px;
  height: 37px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  border: 1px solid #e53635;
  background-color: #eeeeee;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  color: #000;
  margin-bottom: 2rem;
  &:hover{
    box-shadow: 0px 15px 20px rgba(229, 54, 53, 0.4);
    background-color: #e53635;
    color: #eeeeee;
    border: none;
  }
`;

const MyContentModal = React.memo(({myCtModal, setMyCtModal, handleMyCtModalOff}) => {

  const dispatch = useDispatch();
  const { content, hashtag, image, postingId} = useSelector(state => ({
    content: state.pickPosting.postInfo.content,
    hashtag: state.pickPosting.postInfo.hashtag,
    image: state.pickPosting.postInfo.image,
    postingId: state.pickPosting.postInfo.postId,
  })); 
  const accessToken = useSelector(state => state.loginReducer.login.accessToken); 
  const kakaoAcToken = useSelector(state => state.kakaoReducer.login.accessToken);

  const kakaoIsLogin = useSelector(state => state.kakaoReducer.login.isLogin)
  const isLogin = useSelector(state => state.loginReducer.login.isLogin)



  // 내 콘텐츠 삭제 핸들러
  const deleteMyctHandler = (e) => {
    alert('삭제 후 게시물은 복구할 수 없습니다.')
    const postId = e.target.id;
    if(isLogin){
       dispatch(onDeleteMypost(postId))
       dispatch(getUserInfo(accessToken));
      setMyCtModal(false);
    } else if (kakaoIsLogin){
       dispatch(onDeleteKakaoMypost(postId))
       dispatch(getKakaoUserInfo(kakaoAcToken))
      setMyCtModal(false);
    }
    

  }
  
  // 내 콘텐츠 업데이트 핸들러
  const updateMyctHandler = (e) => {
    
  }

  if (!myCtModal) return null;
  return(
    <>
    {myCtModal && (
      <BackgroundDark onClick={(e) => handleMyCtModalOff(e)}>
        <ContentModalDiv className='myCtModal'>
          <ContentSlider image={image}/>
          <ContentsWrapper >
            <BtnWrapper>
              <DeleteBtn id={postingId} onClick={(e) => deleteMyctHandler(e)}>Delete</DeleteBtn>
              <Link to='/contentupdate'>
                <UpdateBtn onClick={(e) => updateMyctHandler(e)}>Update</UpdateBtn>
              </Link>
            </BtnWrapper>
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

export default MyContentModal;