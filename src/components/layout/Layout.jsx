
import React, { useContext, useEffect  } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import { UserContext } from '../../context/UserContext'




export default function Layout() {
  
  let {user,setUser ,data}= useContext(UserContext)
  
  
  


  useEffect(()=>{
    let token=localStorage.getItem('token')
    if(token!= null){
      setUser(token)


    }



    
  },[])
  return (
    <>
    <Navbar/>

    <div className="container">
    <Outlet/>

    </div>
      </>
    
  )
}
