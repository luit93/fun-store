import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    products:[],
    searchList:[],
    error:'',
    totalProducts:0,
    productsPerPage:8,
    filteredCount:''
}
const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        fetchProductsLoading:(state)=>{
            state.isLoading=true
        },
        fetchProductsSuccess:(state,action)=>{
            state.products = action.payload.products
            state.searchList= action.payload
            state.isLoading = false
            state.error=''
            state.totalProducts = action.payload.totalProducts
            state.productsPerPage = action.payload.productsPerPage
            state.filteredCount = action.payload.filteredCount
        },
        fetchProductsFail:(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        },
        searchProducts:(state,{payload})=>{
            state.searchList = state.products.filter(row=>{
                if(!payload) return row
                return row.name.toLowerCase().includes(payload.toLowerCase())
            })
        },
        clearErrors:(state)=>{
          
            state.error=null
        }
    }
})
const {reducer,actions} = productsSlice

export const {fetchProductsLoading,fetchProductsSuccess,fetchProductsFail,searchProducts,clearErrors} = actions
export default reducer

