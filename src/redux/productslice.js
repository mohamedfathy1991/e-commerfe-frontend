import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export let getapiproduct= createAsyncThunk('product/getapiproduct',async()=>{
      let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      return data.data

})

let product =createSlice({

      name:'product',
      initialState:{
            product:[],
            loading:false
      },
      reducers:{},
      extraReducers:((builder)=>{
            builder.addCase(getapiproduct.pending,(state,action)=>{
                  state.loading=true
                  


            })
            builder.addCase(getapiproduct.fulfilled,(state,action)=>{
                  state.product=action.payload
                  state.loading=false
                  

            })
            builder.addCase(getapiproduct.rejected,(state,action)=>{

            })

      })


})
export default product.reducer