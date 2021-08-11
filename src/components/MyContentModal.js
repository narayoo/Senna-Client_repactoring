import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import ContentSlider from './ContentSlider';
import { onDeleteMypost, onDeleteKakaoMypost }from '../modules/deleteMyPosting';
import { getUserInfo } from '../modules/login';
import { getKakaoUserInfo } from '../modules/kakao'

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
  z-index: 2;
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
    height: 500px;
    overflow: scroll;
  }
`;
const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  width: 19em;
  @media all and (max-width:767px) {
    width: 100%;
  }
`;
const ContentTextArea = styled.div`
  height: 100%;
  padding-top: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  @media all and (max-width:767px) {
    padding: 0rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
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
    display: none;
  }
  @media all and (max-width:767px) {
    height: 100%;
  }
`;
const HashTagWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20%;
`;
const HashTag = styled.p`
  color: #1b1b1b;
  width: 30%;
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  @media all and (max-width:767px) {
    justify-content: space-around;
    margin-top: 1rem;
    height: 60px;
  }
`;
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
  @media all and (max-width:767px) {
    width: 130px;
    height: 30px;
  }
`;
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
  @media all and (max-width:767px) {
    width: 130px;
    height: 30px;
  }
`;
const PlaceWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 20%;
  margin-bottom: 1rem;
`;
const Place = styled.p`
  color: #1b1b1b;
  font-size: 13px;
  @media all and (min-width:768px) and (max-width:1023px){
  width: 100%;
  }
`;
const KakaoShare = styled.div`
 display: flex;
 padding-left: 84%;
`;
const KakaoShareWrapper = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  margin-bottom: 1rem;
  cursor: pointer;
  @media all and (max-width:767px) {
    margin-bottom: 1rem;
  }
`;
const MyContentModal = React.memo(({myCtModal, setMyCtModal, handleMyCtModalOff}) => {
  const dispatch = useDispatch();
  const { content, hashtag, image, postingId, place} = useSelector(state => ({
    content: state.pickPosting.postInfo.content,
    hashtag: state.pickPosting.postInfo.hashtag,
    image: state.pickPosting.postInfo.image,
    postingId: state.pickPosting.postInfo.postId,
    place : state.pickPosting.postInfo.place
  })); 
  const accessToken = useSelector(state => state.loginReducer.login.accessToken); 
  const kakaoAcToken = useSelector(state => state.kakaoReducer.login.accessToken);
  const kakaoIsLogin = useSelector(state => state.kakaoReducer.login.isLogin)
  const isLogin = useSelector(state => state.loginReducer.login.isLogin)

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
  };
  const updateMyctHandler = (e) => {
    
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
  };

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
      </BackgroundDark>
    )}
    </>
  )
})

export default MyContentModal;