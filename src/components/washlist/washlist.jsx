

import React, { useContext, useEffect, useState } from 'react'
import { Cartcontext } from '../../context/Cartcontext'
import Loading from '../loading/Loading';
import axios from 'axios';
import { Helmet } from 'react-helmet';



export default function Washlist() {

      let{washlistitems,getwashlist,setwashlistitems,addItemToCart}=useContext(Cartcontext)
      let [loading, setloading] = useState(true);
      async function getWshlistItem(){
            try{
                  let req= await getwashlist()
                  setloading(false)

                  setwashlistitems(req?.data?.data)

            }catch(err){
                  setloading(false)
                  console.log(err)
            }
      }
      async function removewashlist(id) {
            try {
              let req = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                
                {
                  headers: {
                    token: localStorage.getItem("token"),
                  },
                }
              );
             
            } catch (err) {
              console.log(err);
            }
          }

    async function  addToCrt(id){
        setloading(true)
       let req= await addItemToCart(id)
         await removewashlist(id)
         setloading(false)


     }
      useEffect(()=>{
            getWshlistItem()

      },[loading])

  return (
    <>
     <Helmet>
        <title>washlist</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    {loading?<Loading/>:
    <div>
       {washlistitems.length== 0 ? <h1> washlist empty</h1>:
       <div className="container">
             <div className="row">
            {
                   
      washlistitems.map(((element,i)=>{
            return(
                  
                    <div key={i} className="col-10">
                  <div className="row align-items-center">
                     
                    <div className="col-2">
                      <img
                        className="w-100"
                        src={element.imageCover}
                        alt=""
                      />
                    </div>
                    <div className="col-10 align-items-center">
                      <h6> title:{element.title} </h6>
                      <button onClick={()=>{
                        addToCrt(element.id)
                      }} className='d-block btn btn-success my-3'>add to cart </button>
                      <h5>
                        price:
                        <span className="text-main">{element.price}</span>
                      </h5>
                     
                    </div>
                  </div>
                </div>
                
                  
                
            )

      }))
            }

      </div>

       </div>
     
     
       
       }



    </div>
    }
    
    
    </>
  )
}
