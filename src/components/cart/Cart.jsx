import React, { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../../context/Cartcontext";
import Loading from "../loading/Loading";

export default function Cart() {
  let { getCart,deletitemCart,deletallCart, cartitem,setcartitem} = useContext(Cartcontext);
  let [cartprdouct, setcartproduct] = useState([]);
  let [loading, setloading] = useState(true);

  async function getDataCart() {
    try {
      let data = await getCart();
      if (data?.data?.status == "success") {
        setcartproduct(data.data.data);
        setloading(false);
      }
    } catch (err) {
      
      setloading(false);
      
        

      
    }
  }

 async function deletoneItemcart(id){
   let req= await deletitemCart(id)
   if(req.data.status=="success"){
    setcartitem(req.data.numOfCartItems)
    setcartproduct(req.data.data)

  }
 
  }

 async function cleatCart() {
  let req= await deletallCart()
  if(req.data.message=="success"){
    console.log('clear')
    setcartitem(null)
    setcartproduct(null)

  }
 
 

            
            
  }
  useEffect(() => {
    getDataCart();
  },[]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
       <>
       {cartprdouct?.products== null ? <h1> cart empty</h1>
       :
       <div>
       <div className="container pt-5 ">
         <button onClick={cleatCart} className="btn btn-danger  float-end"> clear cart
         </button>
         <div className="clearfix"></div>
         
         {
         cartprdouct.products.map((element, i) => {
           return (
             <div key={i} className="row  my-2 bg-light border align-items-center ">
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
                   <span className="btn btn-success btn-sm m-2">
                     <i className="fa-solid fa-plus"></i>
                   </span>
                   <span>{element.count}</span>
                   <span className="btn btn-danger btn-sm m-2 ">
                     <i className="fa-solid fa-minus "></i>
                   </span>
                 </div>
               </div>
             </div>
           );
         })}
         <h4>
           totla:
           <span className="text-main">{cartprdouct.totalCartPrice}EG</span>
         </h4>
       </div>
     </div>}
       
       
       
       </>
      )}
    </>
  );
}
