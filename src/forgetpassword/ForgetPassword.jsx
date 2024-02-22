import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let navigate = useNavigate();

  const validtation = Yup.object({
    email: Yup.string().email("Invalid Email").required("email required"),
  });
  const validation2 = Yup.object({
    resetCode: Yup.string()
      .required("enter code")
      .matches(/^[0-9]{6}$/, "code error"),
  });

  const [msgError, setmsgError] = useState("");
  const [loading, setloading] = useState(false);
  const [sendingverfy, setsendingverfy] = useState(false);

  async function sendingEmailForm(value) {
    try {
      setloading(true);

      let req = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        value
      );

      console.log(req.data)
      if (req.data.statusMsg=='success') {
            setsendingverfy(true)
      }
      setloading(false);

    } catch (err) {
      console.log(err);
      setloading(false);

      setmsgError(err.response.data.message);
    }
  }

  async function sendingcode(value) {
    try {
      setloading(true);

      let req = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        value
      );
      console.log(req.data)
      setloading(false);
      if(req.data.status=='Success'){
            navigate('/restpasswoprd')
      }
    } catch (err) {
      console.log(err);
      setloading(false);

      setmsgError(err.response.data.message);
    }
  }
  let formik1 = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: sendingEmailForm,

   
    validationSchema: validtation,
  });
  let formik2 = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validation2,

    onSubmit: sendingcode,
  });

  return (
    <>
      <h1 className="text-center mt-5">...Forget password</h1>
      {msgError ? <div className="alert alert-warning">{msgError}</div> : ""}
     

      {!sendingverfy?
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
       ) 
       : (
         ""
       )}

       {!loading ? (
         <>
           <button
             disabled={!(formik1.isValid && formik1.dirty)}
             className="btn bg-main text-white  "
             type="submit"
           >
             send email
           </button>
         </>
       ) : (
         <button
           className=" btn bg-main text-white loadingbtn   "
           type="button"
         >
           sending <i className="fa-solid fa-spinner fa-spin bg-main"></i>
         </button>
       )}
     </form> 
      :
      <form onSubmit={formik2.handleSubmit}>
      <label htmlFor="code"> enter code:</label>
      <input
       value={formik2.values.resetCode}
        onBlur={formik2.handleBlur}
        onChange={formik2.handleChange}
        type="restcode"
        name="resetCode"
        className="form-control my-2"
        id="code"
      />
      {formik2.errors.resetCode && formik2.touched.resetCode ? (
        <p className="  alert alert-danger "> {formik2.errors.resetCode}</p>
      ) : (
        ""
      )}

      {!loading ? (
        <>
          <button
            disabled={!(formik2.isValid && formik2.dirty)}
            className="btn bg-main text-white  "
            type="submit"
          >
            verfy code
          </button>
        </>
      ) : (
        <button
          className=" btn bg-main text-white loadingbtn   "
          type="button"
        >
          sendingcode <i className="fa-solid fa-spinner fa-spin bg-main"></i>
        </button>
      )}
    </form>} 
    </>
  );
}
