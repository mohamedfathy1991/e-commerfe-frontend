import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../loading/Loading';
import Categorydetails from './Categorydetails';
import { Helmet } from 'react-helmet';


export default function Category() {

  function fetchdata() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const { error, data, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => fetchdata(),
  });

  if (isLoading) return <Loading />;
  if (error) return <h1>An error has occurred: {error.message}</h1>;

  return (
    <>
     <Helmet>
        <title>category</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      <h1 className='text-center text-main fw-bolder my-3 green'>All category</h1>

      
      <div className="row">
        {data.data.data.map((category) => (
          <Categorydetails key={category._id} category={category} />
        ))}
      </div>
    </>
  );
}
