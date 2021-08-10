import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory,Link } from 'react-router-dom'
import StackGrid from "react-stack-grid";
import dotenv from 'dotenv';
import '../style/main.css';
import '../style/nav.css';
import CountrySelect from '../components/CountrySelect';
import logo from '../img/SennaLogo.png';
import styled from 'styled-components';
import LoginModal from './LoginModal';
import ContentModal from './ContentModal';
import { localLogin, localLogout } from '../modules/loginReducer';
import { getAllOfPosting } from '../modules/showAllPosting';
import { getPickPosting } from '../modules/pickPosting';
import { kakaoLogin } from '../modules/kakaoReducer';
import { getUserInfo } from '../modules/loginReducer';
import useIntersect from './useIntersect';


dotenv.config()

const {Kakao} = window;

const AlbumSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  padding-left: 10rem;
  padding-right: 10rem;
  @media all and (min-width:768px) and (max-width:1023px) { 
    padding-left: 0rem;
    padding-right: 0rem;
  }
  @media all and (max-width:767px) {
    padding-left: 0rem;
    padding-right: 0rem;
  }
`;
const PhotoImg = styled.img`
  width:100%;
  &:hover{
    cursor: pointer;
  }
`;
const AddButton = styled.button`
  width: 100px;
  height: 37px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-bottom: 2rem;
  margin-right: 11rem;

  &:hover{
    background-color: #00acc1;
    box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
  @media all and (min-width:768px) and (max-width:1023px) { 
    margin-right: 5rem;
  }
  @media all and (max-width:767px) {
    margin-right: 4rem;
  }
`;
const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const SearchResult = styled.div`
  text-transform: uppercase;
  font-size: 5rem;
  margin-left: 20rem;
  margin-top: 5rem;
  @media all and (min-width:768px) and (max-width:1023px) { 
    margin-left: 5rem;
  }
  @media all and (max-width:767px) {
    margin-left: 3rem;
    font-size: 3rem;
  }
`;
const TotalComponent = styled.p`
  margin-left: 11rem;
  @media all and (min-width:768px) and (max-width:1023px) { 
    margin-left: 5rem;
  }
  @media all and (max-width:767px) {
    margin-left: 4rem;
    font-size: 11px;
  }
`;
const NavSection = styled.div`
  width: 100%;
  position: sticky;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
  transition: all 0.3s ease-in-out;
  padding-top: 2rem;
  @media all and (max-width:767px) {
    padding-top: 1rem;
  }
`;
const Logo = styled.img`
  height: 5rem;
  display: block;
  margin-left: 3rem;
  &:hover {
    cursor: pointer;
  }
  @media all and (max-width:767px) {
    height: 2.5rem;
    margin-left: 1rem;
    margin-right: 0rem;
  }
`;
const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  margin-right: 30px;
  
  &:hover {
    cursor: pointer;
  }
  @media all and (max-width:767px) {
    font-size: 13px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;
const ButtonGroup = styled.div`
  margin-right: 2rem;
  @media all and (max-width:767px) {
    margin-right: 0rem;
    display: none;
  }
`;
const CountrySelectSection = styled.div`
  width: 50%;
  @media all and (max-width:767px) {
    width: 80%;
    padding-right: 1rem;
    display: none;
  }
`;
const CountrySelectSection2 = styled.div`
  @media all and (max-width:767px) {
    width: 80%;
    padding-right: 1rem;
    display: block;
  }
  display: none;
`;
const HambugBtn = styled.div`
  @media all and (max-width:767px) {
    display: block;
    padding-right: 1.7rem;
    font-size: 20px;
    cursor: pointer;
  }
  display: none;
`;
const HambugToggle = styled.div`
   @media all and (max-width:767px) {
    width: 100%;
    position: sticky;
    top: 3.5rem;
    display: flex;
    align-items: center;
    z-index: 3;
    transition: all 0.3s ease-in-out;
    background-color: rgba(0,0,0,0.8);
    box-shadow: 5px 7px 6px rgba(0,0,0,0.5);
    flex-direction: column;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  display: none;
`;
const Search = React.memo(() => {
  const word = useSelector(state => state.searchReducer.word);
  const data = useSelector(state => state.searchReducer.data);
  const [scrollTop, setScrollTop] = useState(0); 
  const [modal, setModal] = useState(false);
  const [ctModal, setCtModal] = useState(false);
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(null);
  const [heart , setHeart] = useState(null); 
  const [kakaoAT , setkakaoAT] = useState('');
  const localAT = useSelector(state => state.kakaoReducer.login.accessToken);
  const isLogin = useSelector(state => state.loginReducer.login.isLogin); 
  const kakaoIsLogin = useSelector(state => state.kakaoReducer.login.isLogin);
  const [state, setState] = useState({ itemCount: 0, isLoading: false });
  const [open, setOpen] = useState(false);
  const [postLoading, setPostLoading ] = useState(null);

  const { accessToken } = useSelector(state => ({
    accessToken : state.loginReducer.login.accessToken,
  })); 
  const { likeUser } = useSelector(state => ({
    likeUser : state.pickPosting.postInfo.likeUser,
  })); 
  const dispatch = useDispatch();
  const history = useHistory();

  const clickLogo = () => {
    window.location.replace("/")
  };
  const gotoMypage = () => {
    history.push('./mypage');
    dispatch(getUserInfo(accessToken));
  };
  useEffect(() => {
    dispatch(getAllOfPosting());
  },[]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [scrollTop]);
  const changeId = (e) => {
    setUserId(e.target.value);
  };
  const changePwd = (e) => {
    setPassword(e.target.value);
  };
  const handleTop = () => {  
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollTop(0); 
  };
  const handleScroll = () => {
    const scroll = document.body.scrollTop || document.documentElement.scrollTop;
    const { scrollHeight, clientHeight } = document.documentElement;
    const scrollTop = scroll / (scrollHeight - clientHeight);
    setScrollTop(scrollTop);
  };
  const openModal = () => {
    setModal(true);
  };
  const onConfirm = async(e) => {
    const body = {
      userId: userId,
      password: password,
    }
    dispatch(localLogin(body));
    setModal(false);
  };
  const onCancle = () => {
    setModal(false);
  };
  const handleModalOff = (e) => {
    const clicked = e.target.closest('.modal');
    if (clicked) return;
    else {
      setModal(false);
    }
  };
  const openCtModal = async (e) => {
    const postId = e.target.id;
    setCtModal(true);
    setPostLoading(true);
    await dispatch(getPickPosting(postId));
    setPostLoading(false);
    if(likeUser.includes(userId)){
      setHeart('like');
    }
  };
  const handleCtModalOff = async(e) => {
    const clicked = e.target.closest('.ctModal');
    if (clicked) return;
    else {
      setCtModal(false);
      if(heart === 'like'){
        setHeart(null);
      }else{
        setHeart(null);
      }
    }
  };
  const logout = () => {
    dispatch(localLogout(accessToken))
    history.push('./')
  };
  const onSocialLogin = () => {
    Kakao.Auth.login({
      success: function(authObj) {
        let ac = authObj.access_token;
        let socialAC = `Bearer ${ac}`;
        setkakaoAT(socialAC)
        dispatch(kakaoLogin(socialAC));
        setModal(false);
      },
      fail: function(err) {
      },
    })
  };
  const kakaoLogout = () => {
    Kakao.Auth.logout(function() {
      dispatch(kakaoLogout(kakaoAT, localAT))
    })
  };
  const onHambugBtn = async() => {
    setOpen(!open);
  };
  const fakeFetch = (delay = 100) => new Promise(res => setTimeout(res, delay));
  const fetchItems = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    await fakeFetch();
    setState(prev => ({
      itemCount: prev.itemCount + 5,
      isLoading: false
    }));
  };
  useEffect(() => {
    fetchItems();
  }, []);
  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  }, {});
  const { itemCount, isLoading } = state;
  if (!itemCount) return null;
  
  return (
    <>
      <NavSection className={ scrollTop > 0.01 ? 'darkNav' : 'original' }>
        <Link to='./'>
          <Logo src={logo} onClick={clickLogo} />
        </Link>
        <CountrySelectSection>
          <CountrySelect />
        </CountrySelectSection>
        { scrollTop  > 0.01 ?
        <HambugBtn onClick={(e) => onHambugBtn(e)}>
            <i className="fas fa-bars"></i>
          </HambugBtn>
          :<></>
        }
        <ButtonGroup>
          { 
          (() => {
            if(isLogin) {
              return (
                <>
                <NavButton onClick={() => gotoMypage()}>Mypage</NavButton>
                <NavButton onClick={() => logout()}>Logout</NavButton>
                </>
            )}else if(kakaoIsLogin){
              return (
                <>
                <NavButton onClick={() => gotoMypage()}>Mypage</NavButton>
                <NavButton onClick={() => kakaoLogout()}>Logout</NavButton>
                </>
            )}else{
              return (
                <>
                <Link to='/signup'>
                  <NavButton>Join Free</NavButton>
                </Link>
                <NavButton onClick={openModal}>Login</NavButton>
                </>
              )}
          })()
          }
        </ButtonGroup>
      </NavSection>
      {scrollTop  > 0.01 && 
      open
      ? 
        <HambugToggle>
          { 
            (() => {
              if(isLogin) {
                return (
                  <>
                  <CountrySelectSection2>
                    <CountrySelect />
                  </CountrySelectSection2>
                  <NavButton onClick={() => gotoMypage()}>Mypage</NavButton>
                <NavButton onClick={() => logout()}>Logout</NavButton>
                  </>
              )}else if(kakaoLogin){
                return (
                  <>
                  <CountrySelectSection2>
                    <CountrySelect />
                  </CountrySelectSection2>
                  <NavButton onClick={() => gotoMypage()}>Mypage</NavButton>
                <NavButton onClick={() => kakaoLogout()}>Logout</NavButton>
                  </>
              )}else if (!isLogin && !kakaoLogin){
                return (
                  <>
                  <CountrySelectSection2>
                    <CountrySelect />
                  </CountrySelectSection2>
                  <Link to='/signup'>
                  <NavButton>Join Free</NavButton>
                  </Link>
                  <NavButton onClick={openModal}>Login</NavButton>
                  </>
                )}
            })()
            }
        </HambugToggle>
      :
      <></>
      }
      <SearchResult>{word}</SearchResult>
      <AlbumSection>
        <AddButtonWrapper>
          <TotalComponent>
            <i className="fas fa-feather-alt">&nbsp;&nbsp;{data?.length}</i>
          </TotalComponent>
          {
            isLogin ? 
            <Link to='/addcontents'>
              <AddButton>Add</AddButton>
            </Link>
            :
            <></>
          }
        </AddButtonWrapper>
        <StackGrid 
          columnWidth={300}
          gutterWidth={25}
          gutterHeight={25}
          style={{ width: "100%" }}>
          { data?.slice(0,itemCount).map((photo,index)=> {
            return <div key={index} onClick={(el) => openCtModal(el)}>
              <PhotoImg id={photo._id} key={index} src={photo.image[0]} loading="lazy"></PhotoImg>    
            </div>
            }
          )}
        <div ref={setRef} />
        </StackGrid>
      </AlbumSection>
      <div className='topBtnWrapper'>
        <button 
        className='topBtn' 
        style={{display: scrollTop > 0.2 ? 'block' : 'none'}}
        onClick={() => handleTop()}>Top</button>
      </div> 
      <LoginModal
        loading={loading}
        changePwd={changePwd}
        changeId={changeId}
        userId={userId}
        password={password}
        handleModalOff={handleModalOff}
        visible={modal}
        onConfirm={onConfirm}
        onCancle={onCancle}
        onSocialLogin={onSocialLogin}
        >
        <input type='text'></input>  
      </LoginModal>
      <ContentModal
        heart={heart}
        setHeart={setHeart}
        handleCtModalOff={handleCtModalOff}
        ctModal={ctModal}
        postLoading={postLoading}
        >
      </ContentModal>
    </>
  )
})
export default Search;