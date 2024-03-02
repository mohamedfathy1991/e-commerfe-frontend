import { createSlice } from "@reduxjs/toolkit";


   let initialState={
      count:0,
      username:'ali'
     }


let counterSlice= createSlice({
      name:'counter',
     initialState,
      reducers:{
            increment:(state,action)=>{
                  console.log(action)
                  state.count++
            },
            incrementbynumber:(state,action)=>{
                  state.count +=action.payload
            }
      }
})
 
export let counterReducer= counterSlice.reducer
//action creator
export let {increment,incrementbynumber} =counterSlice.actions