import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';

export default function ResetPassword() {
  let navigate = useNavigate();

  const validtation = Yup.object({
    
    email: Yup.string().email("Invalid Email").required("email required"),
    newPassword: Yup.string()
      .required("newPassword Required")
      .matches(/^[A-Za-z0-9][A-Za-z0-9]{5,16}$/, "Must be at least 6"),

  });

  const [msgError, setmsgError] = useState("");
  const [loading, setloading] = useState(false);

  async function registerForm(value) {
    try {
      setloading(true);

      let req = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        value
      );

     if(req.data.token){
      navigate('/login')
     }
   

      setloading(false);


      
    } catch (err) {
      console.log(err)
     

      setloading(false);

      setmsgError(err.response.data.message);
    }
  }
  let formik1 = useFormik({
    initialValues: {
    
      email: "",
      newPassword: "",
     
    },
    onSubmit: registerForm,

   
    validationSchema: validtation,
  });
  return (
    <>
      <h1 className="text-center mt-5">...reset password</h1>
      {msgError ? <div className="alert alert-warning">{msgError}</div> : ""}
      <form onSubmit={formik1.handleSubmit}>
        <label htmlFor="email"> enter email:</label>
        <input
          onBlur={formik1.handleBlur}
          onChange={formik1.handleChange}
          type="email"
          name="email"
          className="form-control my-2"
          id="email"
        />
        {formik1.errors.email && formik1.touched.email ? (
          <p className="  alert alert-danger "> {formik1.errors.email}</p>
        ) : (
          ""
        )}

        <label htmlFor="newPassword"> enter newPassword:</label>
        <input
          onBlur={formik1.handleBlur}
          onChange={formik1.handleChange}
          type="Password"
          name="newPassword"
          className="form-control my-2"
          id="newPassword"
        />
        {formik1.errors.newPassword && formik1.touched.newPassword ? (
          <p className="  alert alert-danger "> {formik1.errors.newPassword}</p>
        ) : (
          ""
        )}

        {!loading ? (
          <>
         
               
          <button
            disabled={!(formik1.isValid && formik1.dirty)}
            className="btn bg-main text-white  "
            type="submit"
          >
            submit
          </button>
          </>
          
        ) : (
          <button
            className=" btn bg-main text-white loadingbtn   "
            type="button"
          >
            submiting <i className="fa-solid fa-spinner fa-spin bg-main"></i>
          </button>
        )}
      </form>
    </>
  );
}

