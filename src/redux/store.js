import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { colorreducer } from "./colorslice";
import productreducer from './productslice'
import namesreducer from "./nameslice"

export  let store = configureStore({
      reducer:{
            counters:counterReducer,
            colors:colorreducer,
            products:productreducer,
            names:namesreducer

            
      }
})
