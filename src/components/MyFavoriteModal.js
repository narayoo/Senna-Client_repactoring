import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import styled from 'styled-components';
import ContentSlider from './ContentSlider';
import { getUserInfo } from '../modules/loginReducer';
import { onDeleteFavo , onDeleteKakaoFavo }from '../modules/deleteFavo';
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
  width: 19em;
  margin-right: 2rem;
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
// 좋아요한 콘텐츠 삭제 핸들러
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
const MyFavoriteModal = React.memo(({favoCtModal, setFavoCtModal, handleFavoCtModalOff}) => {

  const dispatch = useDispatch();
  
  const { content, hashtag, image, } = useSelector(state => ({
    content: state.pickPosting.postInfo.content,
    hashtag: state.pickPosting.postInfo.hashtag,
    image: state.pickPosting.postInfo.image,
  })); 
  const { postingId} = useSelector(state => ({
    postingId: state.pickPosting.postInfo.postId,
  })); 
  const {accessToken, userKey} = useSelector(state => ({
    accessToken: state.loginReducer.login.accessToken,
    userKey: state.loginReducer.user.id,
  })); 

  const kakaoAcToken = useSelector(state => state.kakaoReducer.login.accessToken);
  const kakaoUserKey = useSelector(state => state.kakaoReducer.login.userKey)
  const kakaoIsLogin = useSelector(state => state.kakaoReducer.login.isLogin)
  const isLogin = useSelector(state => state.loginReducer.login.isLogin)



  if (!favoCtModal) return null;

  // 좋아요한 게시물 삭제
  const deleteFavoCtHandler = async(e) => {
    alert('해당 게시물 좋아요를 취소합니다.')
    const postId = e.target.id;
      await dispatch(onDeleteFavo(postId,userKey))
      await dispatch(getUserInfo(accessToken));
      setFavoCtModal(false);
  }

  const deleteKakaoFavoCtHandler = async(e) => {
    alert('해당 게시물 좋아요를 취소합니다.')
    const postId = e.target.id;
    await dispatch(onDeleteKakaoFavo(postId,kakaoUserKey))
    await dispatch(getKakaoUserInfo(kakaoAcToken))
    setFavoCtModal(false);

  }

  return(
    <>
    {favoCtModal && (
      <BackgroundDark onClick={(e) => handleFavoCtModalOff(e)}>
        <ContentModalDiv className='myFavoCtModal'>
          <ContentSlider image={image}/>
            <ContentsWrapper >
              <BtnWrapper>
              {(()=> {
              if(isLogin){
                return (
                  <DeleteBtn id={postingId} onClick={(e) => deleteFavoCtHandler(e)}>Delete</DeleteBtn>
                )
              } else if (kakaoIsLogin){
                return (
                  <DeleteBtn id={postingId} onClick={(e) => deleteKakaoFavoCtHandler(e)}>Delete</DeleteBtn>
                )
              }
            })()}
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
export default MyFavoriteModal

