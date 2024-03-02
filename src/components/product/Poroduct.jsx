import React, { useContext, useState } from 'react'
import { Cartcontext } from "../../context/Cartcontext";

export default function Poroduct({element ,setcartproduct}) {
      let { getCart,deletitemCart,deletallCart, cartitem,setcartitem,updateCartitem } = useContext(Cartcontext);

    let[count,setcount]=useState(element.count)
    let [timeoutid,settimeoutid]=useState()


      async function deletoneItemcart(id){
            let req= await deletitemCart(id)
            if(req.data.status=="success"){
             setcartitem(req.data.numOfCartItems)
             setcartproduct(req.data.data)
             console.log(req.data)
             if(req.data.numOfCartItems==0){
               setcartitem(null)
             setcartproduct(null)
         
             }
         
           }
          
           }
         
          async function cleatCart() {
           let req= await deletallCart()
           if(req.data.message=="success"){
         
             setcartitem(null)
             setcartproduct(null)
         
           }
          
          
         
                     
                     
           }
      //      ******* it is important
            function updatecartproduct(id,counts){
                  clearTimeout(timeoutid)
         
         let x  =   setTimeout(async() => {
            if(counts==0){
         
                  deletoneItemcart(id)
            
            
                }else{
                     setcount(counts)
                  let req= await updateCartitem(id,counts)
                  
                  console.log(req.data.data)
                  setcartproduct(req.data.data)
            
                }
            
          }, 3000);
          settimeoutid(x)

            
         
           }
  return (
      <div  className="row  my-2 bg-light border align-items-center ">
      <div className="col-10">
        <div className="row align-items-center">
           
          <div className="col-2">
            <img
              className="w-100"
              src={element.product.imageCover}
              alt=""
            />
          </div>
          <div className="col-10 align-items-center">
            <h6> title:{element.product.title} </h6>
            <h5>
              price:
              <span className="text-main">{element.price}</span>
            </h5>
            <button onClick={()=>{
              deletoneItemcart(element.product._id)
            }} className="btn btn-danger">
              {" "}
              remove <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="col-2">
        <div>
          <span onClick={()=>{
            setcount(count+1)
           updatecartproduct(element.product._id,element.count+1)
         
          }} className="btn btn-success btn-sm m-2">
            <i className="fa-solid fa-plus"></i>
          </span>
          <span>{count}</span>
          <span onClick={()=>{
            console.log(count)
            setcount(count-1)
                 
                 if(count==1){
                 return deletitemCart(element.product._id)
                 }
                 
             updatecartproduct(element.product._id,element.count-1)
         
          }} className="btn btn-danger btn-sm m-2 ">
            <i className="fa-solid fa-minus "></i>
          </span>
        </div>
      </div>
    </div>
    
  )
}
