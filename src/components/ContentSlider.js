import React, { Component } from "react";
import Slider from "react-slick";

export default class ContentSlider extends Component {
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      // 반응형 옵션
      responsive: [ 
        {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
            }
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };
    return (
      <div>
        <Slider {...settings}>
          
        </Slider>
      </div>
    );
  }
}