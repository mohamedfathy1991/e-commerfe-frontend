import React from 'react'
import style from './loading.module.css'

export default function Loading() {
  return (
      <div className= "  d-flex vh-100 align-items-center justify-content-center">

               <span className={style.loader}></span>
      </div>

  )
}
