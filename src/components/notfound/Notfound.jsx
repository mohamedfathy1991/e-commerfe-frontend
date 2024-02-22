import React from 'react'
import './notfound.css'
import  notfoundimg from  '../../assets/error.svg'

export default function Notfound() {
  return (
    <div className=' container text-center me-auto   '>
      <div className="wraper w-50  d-flex     m-auto mt-5  ">
      <img  className='w-100 ' src={notfoundimg} alt=''/>


      </div>
    </div>
  )
}
