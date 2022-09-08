import {fetchProductsLoading,fetchProductsSuccess,fetchProductsFail,searchProducts,clearErrors}  from "../reducers/productSlice"
import {fetchProductDetailsLoading,fetchProductDetailsSuccess,fetchProductDetailsFail} from "../reducers/productDetailSlice"
import { getAllProducts,getProductDetails } from "../api/productApi"

export const fetchAllProducts=(keyword,currPage,price,categories,ratings)=> async (dispatch)=>{
    dispatch(fetchProductsLoading())
    try {
         //fetch data from api
         const result =await getAllProducts(keyword,currPage,price,categories,ratings)
        //  console.log(result.data)
         dispatch(fetchProductsSuccess(result.data))
    } catch (error) {
        dispatch(fetchProductsFail(error.message))
    }
}
export const fetchProductDetails=(id)=> async (dispatch)=>{
    dispatch(fetchProductDetailsLoading())
    try {
         //fetch data from api
         const result =await getProductDetails(id)
         dispatch(fetchProductDetailsSuccess(result.data.product))
    } catch (error) {
        dispatch(fetchProductDetailsFail(error.message))
    }
}

export const filterSearchProducts=(str)=> async (dispatch)=>{
    dispatch(searchProducts())
}

//make errors null
export const clearProductErrors=()=> async(dispatch)=>{
    dispatch(clearErrors)
}