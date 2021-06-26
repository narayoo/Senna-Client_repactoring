import React, {useState, useEffect }from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import demo1 from '../image/demo1.jpg';
import demo2 from '../image/demo2.jpg';
import demo3 from '../image/demo3.jpg';
import demo4 from '../image/demo4.jpg';
import demo5 from '../image/demo5.jpg';


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


  const UserFavoriteTotalBox = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  width: 1230px;
  height: 340px;
  background-color: yellow;
`

const FavoritesContent = styled.div`
  margin: 0 auto;
  width: 250px;
  height: 270px;
  background-color: pink;
`

const FavoritesImage = styled.img`
  padding: 5px;
  width: 250px;
  height: 270px;
`




  
  function UserFavorite() {
    return (
      <>
        <UserFavoriteTotalBox >
        <h2> My Favorites </h2>
        <Slider {...settings}>
          <FavoritesContent>
            <FavoritesImage src={demo1} />
          </FavoritesContent>
          <FavoritesContent>
            <FavoritesImage src={demo2} />
          </FavoritesContent>
          <FavoritesContent>
            <FavoritesImage src={demo3} />
          </FavoritesContent>
          <FavoritesContent>
            <FavoritesImage src={demo4} />
          </FavoritesContent>
          <FavoritesContent>
            <FavoritesImage src={demo5} />
          </FavoritesContent>
        </Slider>
      </UserFavoriteTotalBox>
      </>
    )
  }
  


export default UserFavorite
