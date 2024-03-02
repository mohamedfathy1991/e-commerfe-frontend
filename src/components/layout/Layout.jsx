
import React, { useContext, useEffect  } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import { UserContext } from '../../context/UserContext'
import { Offline } from 'react-detect-offline'



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

    <div className="check-network" >
    <Offline>  check your conection</Offline>

    </div>
    <Outlet/>

    </div>
      </>
    
  )
}
