
import React, { useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import img1 from '../../assets/slider-image-1.jpeg'
import img2 from '../../assets/slider-image-2.jpeg'
import img3 from '../../assets/slider-image-3.jpeg'
import img5 from '../../assets/slider-image-2.jpeg'
import img4 from '../../assets/grocery-banner-2.jpeg'


export default function Mainslider() {
 

     
  return (
    <div className="row g-0">
     
      <div className="col-md-9">
    <OwlCarousel   
      className='owl-theme' autoplaySpeed={1}	
      autoplayTimeout={1000} items={1}  loop autoplay={true}   >
      <div className='item'>
          <img  height={300} width={300} src={img1}alt=''/> 
      </div>
      <div className='item'>
      <img width={300} height={300} src={img2}alt=''/> 
      </div>
      <div className='item'>
      <img height={300} width={300} src={img3}alt=''/> 
      </div>
     
  </OwlCarousel>
      </div>
      <div className="col-md-3">
        <div>
        <img  height={150} className='w-100' src={img4}alt=''/> 
        <img  height={150} className='w-100' src={img5}alt=''/> 
        </div>


      </div>
    </div>
  
   
  
  )
}
