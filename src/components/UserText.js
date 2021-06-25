import React, {useState, useEffect }from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };



  const UserTextTotalBox = styled.div`
    margin-top: 5px;
    margin-left: 10px;
    width: 1230px;
    height: 340px;
    background-color: yellow;
  `
  
  const TextContent = styled.div`
    margin: 0 auto;
    width: 250px;
    height: 270px;
    background-color: pink;
  `
  

  
  function UserText() {
    return (
      <>
       <UserTextTotalBox >
        <h2> My Contents </h2>
        <Slider {...settings}>
          <TextContent>
            <h3>1</h3>
          </TextContent>
          <TextContent>
            <h3>2</h3>
          </TextContent>
          <TextContent>
            <h3>3</h3>
          </TextContent>
          <TextContent>
            <h3>4</h3>
          </TextContent>
          <TextContent>
            <h3>5</h3>
          </TextContent>
        </Slider>
      </UserTextTotalBox>

      </>
    )
  }
  


export default UserText
