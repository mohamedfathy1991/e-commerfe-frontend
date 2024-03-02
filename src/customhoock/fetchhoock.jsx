 import axios from 'axios'
import React, { useEffect, useState } from 'react'
 
 export default function useFetch() {

      let [data,setdata]=useState()
      useEffect(()=>{
           ( async function fetchdata(){
            
                  
                  let x = await axios.get('https://jsonplaceholder.typicode.com/posts')
                  setdata(x.data)
      

            })()


            

      },[])

   return (
    [data]
   )
 }
 