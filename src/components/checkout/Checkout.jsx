

import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { Cartcontext } from '../../context/Cartcontext'
import {  useParams } from 'react-router-dom'


export default function Checkout() {

      let {id}=useParams()
      let validationSchema= Yup.object({
            city:Yup.string().required("City is required"),
            phone:Yup.string().required('enter phone'),
            details:Yup.string().required('enter details'),

      })
      let {checkOut}= useContext(Cartcontext)
     async function chaeckoutPayment(values){
            
           let x= await checkOut(values,id)
           console.log(x)
  
      //      window.location.href=(x.data.session.url)
      /**
       * I  i cant use navigate here because navigate use for pathes in react app only 
       * if i nedd to open external site use open orwindow locationhref= path     */
      window.open(x.data.session.url, "_blank","width:400px,height:600px"); 

           


      }
      const formik = useFormik({
            initialValues:{
                  city:"",
                  phone:"",
                  details:""
            },
            validationSchema,
            onSubmit:chaeckoutPayment


      })
  return (
      <form  onSubmit={formik.handleSubmit}>
            <input onChange={formik.handleChange} type="text" placeholder='enter city' name="city" className='form-control my-3' id="" />
            <input onChange={formik.handleChange} placeholder='enter phone' type="tel" name="phone" className='form-control my-3'   />
            <textarea onChange={formik.handleChange} placeholder='enter details' name='details' className='form-control my-3'></textarea>
            <button className='btn btn-success' type='submit' > submit</button>
      </form>
    
  )
}
