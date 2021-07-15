import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import Nav from './Nav'
import { addContent , kakaoAddContent} from '../modules/addContentReducer';
import { getAllOfPosting } from '../modules/showAllPosting';
import Autocomplete from "react-google-autocomplete";
import '../style/google.css'



const AddCtWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  width: 50%;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 14rem;
  @media all and (max-width:767px) {
    width: 100%;
    margin-top: 8rem;
  }
  @media all and (min-width:768px) and (max-width:1023px) { 
    width: 100%;
  }
`;
const AddFile = styled.input`
  margin-top: 1rem;
  padding: 0.7rem;
  height: 10%;
  width: 80%;
  color: #1b1b1b;
  background: linear-gradient(#ffffff, #aeaeae);
  font-size: 13px;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:hover{
    color: #fff;
    cursor: pointer;
    background: #494949;
  }
  @media all and (min-width:768px) and (max-width:1023px) { 
    margin-top: 2rem;
  }
`;
const AddCtText = styled.textarea`
  width: 80%;
  height: 20rem;
  padding: 1rem;
  color: #1b1b1b;
  background: linear-gradient(#ffffff, #aeaeae);
  font-size: 17px;
  resize: none;
  margin-bottom: 1rem;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:focus{
    outline: none;
    background: #ffffff;
  }
`;
const ButtonGroup = styled.section`
  max-width: 800px;
  width: 80%;
  margin-top: 3rem;
  text-align: right;
  @media all and (max-width:767px) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
const CancleBtn = styled.button`
  width: 100px;
  height: 37px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #bdbdbd;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-bottom: 2rem;
  &:hover{
    background-color: #8d8d8d;
    box-shadow: 0px 15px 20px rgba(141, 141, 141, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;
const SubmitBtn = styled.button`
  width: 100px;
  height: 37px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  background-color: #00acc1;
  box-shadow: 0px 15px 20px rgba(0, 172, 193, 0.4);
  color: #fff;
  border: none;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-bottom: 2rem;
  margin-left: 1.3rem;

  &:hover{
    color: #000;
    background-color: #fff;
    box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.5);
    transform: translateY(-7px);
  }
`;
const HashTagBox = styled.input`
  padding-left: 1rem;
  padding: 0.7rem;
  height: 10%;
  width: 80%;
  color: #1b1b1b;
  background: linear-gradient(#ffffff, #aeaeae);
  font-size: 17px;
  resize: none;
  box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.8), 0 10px 10px 0 rgba(0, 0, 0, 0.8);
  &:focus{
    outline: none;
    background: #ffffff;
  }
  @media all and (min-width:768px) and (max-width:1023px) { 
    margin-top: 1rem;
  }
`;

 

const UpdateMycontents = React.memo(() => {
  const [ text, setText ] = useState('');
  const [ hash, setHash ] = useState([]);
  const [ photo, setPhoto ] = useState([]);
  const [ ok, setOk ] = useState(false);
  const [ place, setPlace] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const imgArr = [];

  const userId = useSelector(state => state.loginReducer.login.userId);
  const kakoUserId = useSelector(state => state.kakaoReducer.login.userId);
  const isLogin = useSelector(state => state.loginReducer.login.isLogin)
  const kakaoIsLogin = useSelector(state => state.kakaoReducer.login.isLogin)
  
  // 캔슬 버튼 누를 시 새로고침을 위한 함수
  const cancle = () => {
    window.location.replace("/")
  }
  const onChangeText = (e) => {
    setText(e.target.value);
  }
  const onChangeHash = (e) => {
    setHash(e.target.value);
  }
  

  const handleFileOnChange = (e) => {
    let file = e.target.files;
    if(file.length > 5 || file.length < 1) {
      alert('파일은 1장 이상 5장 이하입니다')
      setOk(false);
    }else{
      if(imgArr.length !== 0){
        imgArr = [];
      }else{
        for(let i=0; i<file.length; i++){
          imgArr.push(file[i])
        }
        setOk(true);
      }
    }
    setPhoto(photo.concat(imgArr));
  }
  const onAddContent = async(e) => {
    if(ok && isLogin){
      console.log('유저아이디',userId)
      await dispatch(addContent(hash,text,userId,photo,place));
      alert('등록되었습니다.')
      await dispatch(getAllOfPosting());
      history.push('./');
    } else if (ok && kakaoIsLogin) {
      await dispatch(kakaoAddContent(hash,text,kakoUserId,photo,place));
      alert('등록되었습니다.')
      await dispatch(getAllOfPosting());
      history.push('./');
    }
    else{
      alert('필수 : 파일은 1장 이상 5장 이하입니다');
    }
  }
  
  return (
    <>
    <Nav />
      <AddCtWrapper>
        <AddCtText placeholder='Write Your Memories' value={text} onChange={onChangeText}/>
        <HashTagBox placeholder='ex) #Korea #Seoul' value={hash} onChange={onChangeHash}/>
        <AddFile multiple type='file' className='img' name='images' accept='image/*' onChange={handleFileOnChange}></AddFile>
        <>
        <Autocomplete apiKey='AIzaSyBZ00JR8dRVy70lU5omSXLk3YsGWi0c0NE' onPlaceSelected={(place,inputRef, autocomplete) => { setPlace(autocomplete.gm_accessors_.place.Dj.formattedPrediction)}} 
          options={{
            types: [],
            fields: ['geometry.location','address_components','place_id','formatted_address']
          }}
        id='autocomplete'/>
        </>
        <ButtonGroup>
          <Link to='./'>
            <CancleBtn onClick={() => cancle()}>Cancle</CancleBtn>
          </Link>
          <SubmitBtn onClick={() => onAddContent()}>Submit</SubmitBtn>
      </ButtonGroup>
    </AddCtWrapper>
  </>
  );
})


export default UpdateMycontents;


// setPlace(autocomplete.gm_accessors_.place.Dj.formattedPrediction)