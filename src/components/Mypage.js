import React from 'react'
import redux from 'redux'
import { connect } from 'react-redux';
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
          <Profliephoto />
          </ProfileSection>
          </>
    );
  }


  export default Mypage;

