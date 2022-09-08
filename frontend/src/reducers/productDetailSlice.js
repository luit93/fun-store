import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    product:{},
    error:''
}
const productDetailSlice = createSlice({
    name:"productDetails",
    initialState,
    reducers:{
        fetchProductDetailsLoading:(state)=>{
            state.isLoading=true
        },
        fetchProductDetailsSuccess:(state,action)=>{
            state.product = action.payload
            state.isLoading = false
            state.error=''
        },
        fetchProductDetailsFail:(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        },
        clearErrors:(state)=>{
          
            state.error=null
        }
    }
})
const {reducer,actions} = productDetailSlice

export const {fetchProductDetailsLoading,fetchProductDetailsSuccess,fetchProductDetailsFail} = actions
export default reducer

