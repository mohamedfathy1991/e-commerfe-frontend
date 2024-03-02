import axios from "axios";
import { createContext, useState,  } from "react";
import React from 'react'






export let Cartcontext = createContext()
export default function Cartcontextprovider(props) {
      let [cartitem,setcartitem]=useState('')
      let [cartid,setcartid]=useState('')
      let [washlistitems,setwashlistitems]=useState([])
      
      
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

      function updateCartitem(itemid,count){
            return   axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${itemid}`,{
                  count:count

            },{
                  headers:{
                        token:localStorage.getItem('token')
                  }
            })

      }
     async function checkOut(value,id){
           try{
             return  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000/`,
            {
                  shippingAddress:value
            },
            {
                  headers:{
                        token:localStorage.getItem('token')
                           }
            }
             )
            

           }catch(err){
            console.log(err)

           }

           
      }
      async function getwashlist(){
            return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
                  headers:{
                        token:localStorage.getItem('token')
                  }
            })

      }
     


  return (

      
    <Cartcontext.Provider  value={{getwashlist,setwashlistitems,washlistitems,cartid,setcartid,getCart,updateCartitem,addItemToCart,deletitemCart,deletallCart ,cartitem,setcartitem ,checkOut}}>
      {props.children}



    </Cartcontext.Provider>
  )
}
