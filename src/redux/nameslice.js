import { createSlice } from "@reduxjs/toolkit";



let nameslice= createSlice({
      name:'name',
      initialState:{
            name:'omar fatthy'
      },
      reducers:{
            changename:(state)=>{
                  state.name="aser"

            }

      }
      
})

export default nameslice.reducer
export let {changename}=nameslice.actions