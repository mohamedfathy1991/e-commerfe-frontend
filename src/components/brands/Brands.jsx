import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import Loading from '../loading/Loading'
import Branddetails from './Branddetails'
import { Helmet } from 'react-helmet'

export default function Brands() {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility


  function fetchdata(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  const {  error, data, isLoading } = useQuery({
  
    queryKey: ['brands'],
    queryFn: async ({queryKey})=>{
   
      return fetchdata(queryKey[1])
    } ,
    
    
     
      
  })
  if(isLoading) return <Loading/>
  if (error) return <h1>'An error has occurred: ' + {error.message}</h1>

  
  

  return (
    <>
     <Helmet>
        <title>Brand</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    <h1 className=' text-center  text-main   fw-bolder my-3 green '> All Brand </h1>
    <div className="row">

    {data.data.data.map((brand )=>{
      return(
                  <Branddetails key={brand._id} brands={brand}/>


      
      

   ) })}

   </div>
    </>
  )
}
