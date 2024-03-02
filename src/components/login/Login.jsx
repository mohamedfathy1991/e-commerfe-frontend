import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Cartcontext } from "../../context/Cartcontext";

export default function Login() {
  let { setUser } = useContext(UserContext);
  let navigate = useNavigate();
  let { getCart, setcartitem } = useContext(Cartcontext);

  const validtation = Yup.object({
    email: Yup.string().email("Invalid Email").required("email required"),
    password: Yup.string()
      .required("Password Required")
      .matches(/^[A-Za-z0-9][A-Za-z0-9]{5,16}$/, "Must be at least 6"),
  });

  const [msgError, setmsgError] = useState("");
  const [loading, setloading] = useState(false);

  async function registerForm(value) {
    try {
      setloading(true);

      let req = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        value
      );
      setUser(req.data.token);
      localStorage.setItem("token", req.data.token);
      if (req.data.message == "success") {
        let requests = await getCart().catch(err=>{
          setcartitem(null);
          navigate("/home");



        })
      
          setcartitem(requests.data.numOfCartItems);
        

        navigate("/home");
      }

      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);

      setmsgError(err.response.data.message);
    }
  }
  let formik1 = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: registerForm,

    /**   if i need validation manul without external liberary Yup    */
    // validate:(values=>{
    //   const errors={}
    //   if(   !values.name){
    //     errors.name='name requre'
    //     return errors
    //   }
    // })
    validationSchema: validtation,
  });
  return (
    <>
      <h1 className="text-center mt-5">...Login form</h1>
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

        <label htmlFor="password"> enter password:</label>
        <input
          onBlur={formik1.handleBlur}
          onChange={formik1.handleChange}
          type="password"
          name="password"
          className="form-control my-2"
          id="password"
        />
        {formik1.errors.password && formik1.touched.password ? (
          <p className="  alert alert-danger "> {formik1.errors.password}</p>
        ) : (
          ""
        )}

        {!loading ? (
          <>
            <Link to={"/forgetpassword"}>
              <button className="  btn  d-block mb-2 btn btn-outline-success ">
                forget password ?
              </button>
            </Link>

            <button
              disabled={!(formik1.isValid && formik1.dirty)}
              className="btn bg-main text-white  "
              type="submit"
            >
              Login
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
