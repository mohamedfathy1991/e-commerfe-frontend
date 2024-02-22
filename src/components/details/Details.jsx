import { useQuery } from "@tanstack/react-query";
import axios, { Axios } from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import { Cartcontext } from "../../context/Cartcontext";
import Swal from 'sweetalert2'


export default function Details() {
  let { id } = useParams();

  // it is tricks to show loading
  let [idproduct, setidproduct] = useState(id);
  let { addItemToCart ,setcartitem} = useContext(Cartcontext);
  async function addtocart(id){
    try{
     let req= await addItemToCart(id)
     if(req.data.status=='success'){
      Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          });
     
          
      setcartitem(req.data.numOfCartItems)

    }}
    catch(err){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });

    }

  }


  async function fetchdatadetails(id) {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["productdetails", idproduct],
    queryFn: () => fetchdatadetails(id),
  });

  if (isPending) {

    return <Loading />;
  }

  if (error) return "An error has occurred: " + error.message;

  function changeimage(e) {
    document
      .querySelector(".image")
      .setAttribute("src", e.target.getAttribute("src"));
  }

  return (
    <>
      <div className=" container mt-4">
        <div className="row align-items-center ">
          <div className="col-md-4  ">
            <div className="row g-1">
              <div className="col-10">
                <div>
                  <img
                    className="w-100 image"
                    height={400}
                    src={data?.data?.data.imageCover}
                  />
                </div>
              </div>
              <div className="col-2">
                {data.data.data.images.map((item, i) => {
                  return (
                    <img
                      key={i}
                      className="w-100"
                      onClick={changeimage}
                      height={100}
                      src={item}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col md-8  ">
            <div>
              <h3>{data.data.data.title}</h3>

              <h6 className="text-muted">{data.data.data.description}</h6>
              <h5 className="text-main">{data.data.data.category.name}</h5>

              <div className="d-flex justify-content-between">
                <span>{data.data.data.price}EG</span>
                <span>
                  <i className=" fa-solid fa-star rating-color"></i>{" "}
                  {data.data.data.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => {
                  addtocart(data?.data?.data.id);
                }}
                className="btn mt-2 w-100 bg-main text-white"
              >
                {" "}
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
