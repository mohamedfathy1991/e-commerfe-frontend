import { createSlice } from "@reduxjs/toolkit";



let colorslice= createSlice({


      name:"color",
      initialState:{
            colorname:"red"
      },
      reducers:{
            changecolor:(state)=>{
                  state.colorname='green'
      
            }
      }
      
})
export let colorreducer=colorslice.reducer