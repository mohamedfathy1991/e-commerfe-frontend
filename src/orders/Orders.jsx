import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Helmet } from 'react-helmet'



export default function Orders() {
  let {data}=  useContext(UserContext)
 let [orders,setorders]=useState([])

     async function getOrder(){
      let req= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${data.id}`)
      console.log(req.data)
      
      if(req.statusText=='OK'){
        setorders(req.data)
      }

      }

      useEffect(()=>{
       getOrder()
            
      },[])
  return (
    <>
     <Helmet>
        <title>orders</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    <h1>order</h1>
    {
      !orders? <h1> no order</h1>:
      <>
      {orders?.map((order,i)=>{
        return (
          <div  key={i} className="row">
               <div className='col-3'>
          totla order price: {order.totalOrderPrice}EG 
               
         </div>
         <div className='col-8'>
           data of this order: {order.createdAt
  }
  
        
        
         </div>
  
         <hr/> 
          </div>
         
         
          
        )
      })}
      </>
      
    }
    
  

   
 
    
    </>
    
    
  )
}
