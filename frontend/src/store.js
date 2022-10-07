
import {configureStore} from "@reduxjs/toolkit"
import productsReducer from './reducers/productSlice'
import productDetailsReducer from "./reducers/productDetailSlice"
import accountReducer from "./reducers/accountSlice"
// import thunk from 'redux-thunk'
// import {composeWithDevTools} from "redux-devtools-extension"



// let initialState ={}
// const middleware =[thunk]

const store = configureStore({
    reducer:{
        products:productsReducer,
        productDetails:productDetailsReducer,
        account:accountReducer
    }
})

export default store