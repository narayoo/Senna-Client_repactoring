import React from 'react'
import styled from 'styled-components';

const ProfileSection = styled.div`
   width: 500px;
   height: 500px;
`
const Profliephoto = styled.div`
  width: 10rem;
  height: 10rem;
  background-image: url();

`

function Mypage() {
    return (
        <>
      <ProfileSection>
        <h1>안녕하소!!!</h1>
        <Profliephoto />
      </ProfileSection>
      </>
    );
  }


  export default Mypage;

