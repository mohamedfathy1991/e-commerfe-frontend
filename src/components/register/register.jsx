
import './register.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Register() {

  let navigate= useNavigate()
 
  
  const validtation= Yup.object({
    name: Yup.string().required( "...Name is required").min(3, "Must be at least 3 letter").max(20,"Too Long"),
    email:Yup.string().email("Invalid Email").required('email required'),
    password:Yup.string().required('Password Required').matches( /^[A-Za-z0-9][A-Za-z0-9]{5,16}$/,'Must be at least 6'),
     
    rePassword:Yup.string().required('enter repassword').oneOf([Yup.ref('password')],"Passwords dontmatch" ),
    phone:Yup.string().required('enter phone').matches(/^01[0125][0-9]{8}$/,'Phone not valid')


  
  })

  const [msgError,setmsgError]=useState('')
  const [loading,setloading]=useState(true)
  
     async function registerForm(value){
      try{
        setloading(false)
      let req= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',value)
      
      if(req.data.message=='success'){
        setloading(true)
        navigate('/login')
      }     
      }catch(err){
      console.log(err)
          setloading(true)
        setmsgError(err.response.data.message)

      }
     

    
     }
  let formik1= useFormik({
    initialValues:{
      name: "",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    onSubmit:registerForm,

    /**   if i need validation manul without external liberary Yup    */
    // validate:(values=>{
    //   const errors={}
    //   if(   !values.name){
    //     errors.name='name requre'
    //     return errors
    //   }
    // })
    validationSchema:validtation
    
  })
  return (
   <>
    <Helmet>
        <title>register</title>
        <meta name="description" content="Helmet application" />
    </Helmet>

    <h1 className='text-center mt-5'>...register form</h1>
    {msgError?<div className="alert alert-warning">{msgError}</div>:''}
     <form onSubmit={formik1.handleSubmit}>


     <label htmlFor='name'> enter name:</label>
     <input  onChange={formik1.handleChange} onBlur={formik1.handleBlur} type='text' name='name' className='form-control my-2' id='name'/>
     {formik1.errors.name && formik1.touched.name?
      <p className='  alert alert-danger '>  {formik1.errors.name  }</p>:""}
    
  
  
  
     <label htmlFor='email'> enter email:</label>
     <input  value={formik1.values.email} onBlur={formik1.handleBlur} onChange={formik1.handleChange} type='email' name='email' className='form-control my-2' id='email'/>
     {(formik1.errors.email && formik1.touched.email)?
      <p className='  alert alert-danger '>  {formik1.errors.email  }</p>:""}







     <label htmlFor='telephone'> enter telephone:</label>  
     <input onBlur={formik1.handleBlur} onChange={formik1.handleChange}  type='tel' name='phone' className='form-control my-2' id='telephone'/>
     {(formik1.errors.phone && formik1.touched.phone)? 
     <p className='  alert alert-danger '>  {formik1.errors.phone  }</p>:""}
     
     
     <label htmlFor='password'> enter password:</label>
     <input onBlur={formik1.handleBlur} onChange={formik1.handleChange} type="password" 
          name='password' className='form-control my-2' id='password'/>
     {(formik1.errors.password && formik1.touched.password)?
      <p className='  alert alert-danger '>  {formik1.errors.password  }</p>:""}


     <label htmlFor='rePassword'> enter rePasswords:</label>
     <input onBlur={formik1.handleBlur} onChange={formik1.handleChange} type="password"
      name='rePassword' className='form-control my-2' id='rePassword'/>
     {(formik1.errors.rePassword && formik1.touched.rePassword)?
      <p className='  alert alert-danger '>  {formik1.errors.rePassword }</p>:""}

    {loading ?<button  disabled={!(formik1.isValid && formik1.dirty)} 
    className='btn bg-main text-white  ' type='submit'>submit </button>:
    <button className=' btn bg-main text-white loadingbtn   ' type='button'>submiting <i className="fa-solid fa-spinner fa-spin bg-main" ></i></button>

}

    </form> 
    
   
   
   
   </>
  )
}
