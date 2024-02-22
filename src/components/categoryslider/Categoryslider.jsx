import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../loading/Loading";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";


export default function Categoryslider() {
  async function getdata() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, error, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getdata,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <h1> eroror {error} </h1>;
  }
  
  return (
    <OwlCarousel className='owl-theme' loop items={8} autoplay={true} autoplayTimeout={1000} dots>
      {data.data.data.map((x,i) => {
          
         return <div key={i} className="item">
         <img src={x.image}  height={200}/>
          
         </div>
      })}
      <div className="item">
     </div>
    
    </OwlCarousel>
  );
}
