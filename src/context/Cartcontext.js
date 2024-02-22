import axios from "axios";
import { createContext, useState,  } from "react";
import React from 'react'






export let Cartcontext = createContext()
export default function Cartcontextprovider(props) {
      let [cartitem,setcartitem]=useState('')
      
      
    async  function addItemToCart(productid){
            
      
            return await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
                  productId:productid
            },
            {
                  headers:{
                        token:localStorage.getItem('token')
                  }
            })
         
         
          
      }
      function getCart(){

            return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
                  headers:{
                        token:localStorage.getItem('token')
                  }
            })
      }
      function deletallCart(){

            return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
                  headers:{
                        token:localStorage.getItem('token')
                  }
            })
      }
      function deletitemCart(itemid){
      
               console.log(itemid)
            return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemid}`,{
                  headers:{
                        token:localStorage.getItem('token')
                  }
            })
      }
     


  return (

      
    <Cartcontext.Provider  value={{getCart,addItemToCart,deletitemCart,deletallCart ,cartitem,setcartitem}}>
      {props.children}



    </Cartcontext.Provider>
  )
}
