import { Carousel } from 'antd';
import Slider from "react-slick";
import history from '../../../utils/history';


function Slide() {

  const settings = {

    dots: true,
    infinite: true,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const contentStyle = {
    height: '500px',
    color: '#fff',

    lineHeight: '160px',
    textAlign: 'center',
    background: 'pink'
  };
  return (
    <div >
      <Slider {...settings} style={{ height: '500px' }}>
    
          <div>
            <div className="home-img-text">
            <h1 style={{color : 'black' , fontSize : '45px'}}> Galaxy S21 | S21 + 5G</h1>
            <button className="home-top-buttom" onClick={() => history.push(`/product/28`)} >Mua ngay</button>
            </div>
       <video  autoPlay  loop auto muted
       style={{width : '100%' , zIndex : '2'}}
       type="video/mp4"
       src="https://images.samsung.com/is/content/samsung/assets/vn/galaxy-s21/home/HOME_T_O_KV_Main_Animated_KV_1440X640.mp4" 
       />
       </div>
          {/* <div>
          
          <video  autoPlay  loop auto muted
          type="video/mp4"
           src="https://images.samsung.com/is/content/samsung/assets/vn/galaxy-s21/pf/HOME_P_KV_Main_Animated_KV_1440X640.mp4" 
         />
             </div> */}
        {/* <div>
          <img style={{ width: '100%' }} src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/5/18/637569448374777977_F-H1_800x300.png" />
        </div> */}
         
      
        </Slider>
    </div>
  );
}
export default Slide;
