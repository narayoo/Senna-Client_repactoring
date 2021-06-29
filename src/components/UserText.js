import React from 'react'
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import demo1 from '../img/demo1.jpg';
import demo2 from '../img/demo2.jpg';
import demo3 from '../img/demo3.jpg';
import demo4 from '../img/demo4.jpg';
import demo5 from '../img/demo5.jpg';



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

  const TextImage = styled.img`
    padding: 5px;
    width: 250px;
    height: 270px;
  `
  

  
  function UserText() {
    return (
      <>
       <UserTextTotalBox >
        <h2> My Contents </h2>
        <Slider {...settings}>
          <TextContent>
            <TextImage src={demo1} />
          </TextContent>
          <TextContent>
            <TextImage src={demo2} />
          </TextContent>
          <TextContent>
            <TextImage src={demo3} />
          </TextContent>
          <TextContent>
            <TextImage src={demo4} />
          </TextContent>
          <TextContent>
            <TextImage src={demo5} />
          </TextContent>
        </Slider>
      </UserTextTotalBox>

      </>
    )
  }
  


export default UserText
