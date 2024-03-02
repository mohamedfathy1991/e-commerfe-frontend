import React, { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../../context/Cartcontext";
import Loading from "../loading/Loading";
import Poroduct from "../product/Poroduct";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Cart() {
  let { getCart,deletallCart,setcartitem,setcartid} = useContext(Cartcontext);
  let [cartprdouct, setcartproduct] = useState([]);
  let [loading, setloading] = useState(true);


  async function getDataCart() {
    try {
      let data = await getCart();
      if (data?.data?.status == "success") {
        setcartproduct(data.data.data);
        setloading(false);
        setcartid(data.data.data._id)
      }
    } catch (err) {
      
      setloading(false);
      
        

      
    }
  }

 

 async function cleatCart() {
  let req= await deletallCart()
  if(req.data.message=="success"){

    setcartitem(null)
    setcartproduct(null)

  }
 
 

            
            
  }
  
  useEffect(() => {
    getDataCart();
  },[]);
  return (
    <>
     <Helmet>
        <title>cart</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
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
            <Poroduct element={element} key={i} setcartproduct={setcartproduct} />
            
            

           
           );
         })}
         <h4>
           totla:
           <span className="text-main">{cartprdouct.totalCartPrice}EG</span>
           <Link to={'/checkout/'+ cartprdouct._id}> 
                      <button className="btn btn-success d-block mt-3">checkout</button>
     </Link>
         </h4>
       </div>
     </div>}
       
       
       
       </>
      )}
    </>
  );
}
