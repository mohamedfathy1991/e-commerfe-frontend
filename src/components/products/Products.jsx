

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Categoryslider from "../categoryslider/Categoryslider";
import Mainslider from "../mainslider/Mainslider";
import { Cartcontext } from "../../context/Cartcontext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

export default function Products() {
  let {
    addItemToCart,
    setcartitem,
    getwashlist,
    setwashlistitems,
    washlistitems,
  } = useContext(Cartcontext);
  let [loading, setloading] = useState(true);

  async function addtocart(id) {
    try {
      let req = await addItemToCart(id);
      if (req.data.status == "success") {
        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        });

        setcartitem(req.data.numOfCartItems);
      }
    } catch (err) {
      console.log(err)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  }

  // let[loading,setloading]=useState(true)

  // async function getallproduct(){
  //   let req= await axios.get('https://ecommerce.routemisr.com/api/v1/products')

  //   setproductlist(req.data.data)
  //   setloading(false)

  // }
  // useEffect(()=>{
  //   console.log('hi')
  //   getallproduct()

  // },[])
  let [p, setp] = useState(1);
  let [productlist, setproductlist] = useState();
  async function fetchdata(page = 1) {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
    );
  }
  const { error, data, isLoading } = useQuery({
    queryKey: ["repoData", p],
    queryFn: async ({ queryKey }) => {
      return fetchdata(queryKey[1]);
    },

    // it mean ewmain the old data untill this time
    staleTime: 2 * 1000,
    // refetchInterval:500
    //  mean if open new window and retuen
    refetchOnWindowFocus: false,

    // clear csh every this time  gcTime:3000,
    // enabled:false
  });

  async function serchbyitem(e) {
    let result = data?.data?.data.filter((item) => {
      return item.title.includes(e.target.value);
    });

    setproductlist(result);
  }

  // }
  function getnextpage(x) {
    setp(x);
  }

  async function addproductFavourite(id) {
    let req = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        productId: id,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  async function removewashlist(id) {
    try {
      let req = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function getshlist() {
    let req = await getwashlist();
    if (req.data.status == "success") {
      setwashlistitems(req.data.data);
    }

    //  washlistitems.forEach(element => {
    //   console.log(element)

    //  });
  }

  function addwishlist(e, id) {
    if (!e.target.classList.contains("red")) {
      addproductFavourite(id);
    } else {
      removewashlist(id);
    }

    e.target.classList.toggle("red");

    // if (e.target.classList.contains('red'){
    // }
  }
  //   let prod=[
  //     {id:123,name:"omar"},
  //     {id:125,name:"os"},
  //     {id:143,name:"aww"},
  // ]
  // let dd=prod.includes(x=>x.id==123)
  // console.log(dd)

  // console.log('output',hasIdOne);
  useEffect(() => {
    getshlist();
  }, []);
  if (isLoading) return <Loading />;
  if (error) return <h1>'An error has occurred: ' + {error.message}</h1>;
 

  return (
    <>
     <Helmet>
        <title>products</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      {/* <button onClick={()=>refetch()} >Click me to fetch data</button> */}
      <div className="container">
        <h1>products</h1>
     
        <input
          onChange={serchbyitem}
          className=" form-control my-3  border"
          placeholder="search"
        />

        <div className="row g-4">
          {
            // it is very important fun search
            (productlist ? productlist : data.data.data).map((item) => {
              return (
                <div key={item.id} className="col-md-3">
                  <div className="product">
                    <Link to={"/prdouctdetails/" + item.id}>
                      <img className="w-100" src={item.imageCover} alt="" />

                      <h6 className="text-main">{item.category.name}</h6>
                    </Link>
                    <div className="d-flex justify-content-between">
                      <h5> {item.title.split(" ").slice(0, 2).join(" ")}</h5>
                      <p>
                        <i
                          onClick={(e) => {
                            addwishlist(e, item.id);
                          }}
                          className={
                            washlistitems?.some((x) => x.id == item.id)
                              ? "red fa-solid fa-heart pointer"
                              : ` fa-solid fa-heart pointer`
                          }
                        ></i>{" "}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between ">
                      <span>price:200</span>
                      <span>
                        <i className=" fa-solid fa-star rating-color"></i>{" "}
                        {item.ratingsAverage}{" "}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        addtocart(item.id);
                      }}
                      className="btn btn bg-main text-white w-100"
                    >
                      add to cart
                    </button>
                  </div>
                </div>
              );
            })
          }
        </div>
        <nav aria-label="Page navigation example ">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <Link className="page-link" tabIndex="-1" aria-disabled="true">
                Previous
              </Link>
            </li>
            <li className="page-item">
              <Link
                onClick={() => {
                  getnextpage(1);
                }}
                className="page-link"
              >
                1
              </Link>
            </li>
            <li className="page-item">
              <Link onClick={() => getnextpage(2)} className="page-link">
                2
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link">Next</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

