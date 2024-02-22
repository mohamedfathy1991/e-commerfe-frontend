import React from 'react'
import Mainslider from '../mainslider/Mainslider'
import img1 from '../../assets/slider-image-2.jpeg'
import img2 from '../../assets/grocery-banner-2.jpeg'
import Categoryslider from '../categoryslider/Categoryslider'

export default function Category() {
  
  return (
    
  <div className="container pt-5">
    <Categoryslider/>

    
        <div className="row g-0">
        
          <div className="col-10">


          <Mainslider/>
          </div>
          <div className='col-2'>
          <div>
            <img height={200} width={200} src={img1} alt=''/>
            <img height={200} width={200} src={img2} alt=''/>
          </div>
          
          </div>
        </div>

  </div>    
    
  
  )
}
