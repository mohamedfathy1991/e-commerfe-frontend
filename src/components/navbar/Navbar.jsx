import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import style from "./navbar.module.css"
import { UserContext } from "../../context/UserContext";
import { Cartcontext } from "../../context/Cartcontext";

export default function Navbar() {
  let navigate=useNavigate()
  let { user, data,setUser } = useContext(UserContext);


  let {cartitem,getCart,setcartitem}= useContext(Cartcontext)
   


  function logOut() {

    localStorage.removeItem("token");
    setUser(null)
    navigate('/login')
    setcartitem('')
  }
  async function getcartnumber(){
    if(localStorage.getItem('token')!=null){
      try{
      let req= await getCart()
      
      if(req.data.status=='success'){
    setcartitem(req.data.numOfCartItems)
      }}
      catch(err){
        setcartitem(null)

        
      }

    }
    
 }
  useEffect(()=>{
    getcartnumber()
    


  },[])
 
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to={"/"}>
          <img width="150" src={logo} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {user ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <NavLink className={"nav-link  "} aria-current="page" to="home">
                  Home
                </NavLink>
              </li>
              <li className= {`nav-item  `}  >
                <NavLink
                  className="nav-link "
                  aria-current="page"
                  to="category"
                >
                  category
                </NavLink>
              </li>
              <li className= {`nav-item  `}  >
                <NavLink
                  className="nav-link "
                  aria-current="page"
                  to="product"
                >
                  product
                </NavLink>
              </li>

              <li className="nav-item ">
                <NavLink className="nav-link " aria-current="page" to="brand">
                  Brand
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="cart">
                  Cart
                </NavLink>
              </li>
            </ul>
          ) : (
            ""
          )}
          <ul className={`navbar-nav ${style.omar} ms-auto mb-2 mb-lg-0`} >
            <li className=" nav-item    mt-2 mx-1">
              <i className=" fa-brands fa-facebook"></i>
            </li>
            <li className="nav-item  mt-2 mx-1">
              <i className={` fa-brands fa-linkedin`}></i>
            </li>
            <li className="nav-item  mt-2 mx-1">
              <i className=" fa-brands fa-twitter"></i>
            </li>
            <li className="nav-item  mt-2 mx-1">
              <i className=" fa-brands fa-instagram"></i>
            </li>
            <li className="nav-item  mt-2 mx-1">
              <i className=" fa-brands fa-youtube"></i>
              
            </li>
            <li className="nav-item  mt-2 mx-1">
  <Link to={'cart'}>
  <i className=" text-main fa-solid fa-cart-shopping position-relative me-4"><span className="position-absolute  bottom-50">
    {cartitem}</span></i>
  </Link>              
            </li>

            {user ? (
              <>
          <li className="nav-item ">

               
                <span onClick={logOut}
                  className="nav-link  cursor-pointer  border"
                  aria-current="page"
                >
                  Logout
                  <span className="active mx-1">
                    {" "}
                    {data
                      ? `${data.name.split(" ").slice(0, 1).join()}   `
                      : ""}
                  </span>
                </span>
              </li>
              </>
            ) : (
              <>
                <li className="nav-item ">
                  <NavLink
                    className="nav-link  "
                    aria-current="page"
                    to="login"
                  >
                    Login
                  </NavLink>
                </li>

                <li className="nav-item ">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
