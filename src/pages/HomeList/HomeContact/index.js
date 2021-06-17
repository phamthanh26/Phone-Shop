import './style.css'
import React from 'react';
import GG from './sale.png'
import Slider from "react-slick";
function HomeContact () {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        cssEase: "linear",
        arrows :false
      };
    return (

        <section className="lazy">
        <article className="lazy-content">
            <h3 className="lazy-offer">
               
                <span className="lazy-offer-btn">
                    {/* <BsStar className="lazy-star" />
                    <span></span>
                    <BsStar className="lazy-star" /> */}
                </span>
              
            </h3>
            <Slider {...settings} >
        <div >
        <img  className="slide-home-sale1"src={GG} />
          </div>
          <div>
              <img className="slide-home-sale" src="https://fptshop.com.vn/Uploads/images/2015/Voucher/Le%20de%20giam%20gia%203004/html%20banner/desktop-title.png"/>
          </div>
        </Slider>
        </article>
    </section>
    )
}
export default HomeContact;
