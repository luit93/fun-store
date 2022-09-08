
import {configureStore} from "@reduxjs/toolkit"
import productsReducer from './reducers/productSlice'
import productDetailSReducer from "./reducers/productDetailSlice"
import accountReducer from "./reducers/accountSlice"
// import thunk from 'redux-thunk'
// import {composeWithDevTools} from "redux-devtools-extension"



// let initialState ={}
// const middleware =[thunk]

const store = configureStore({
    reducer:{
        products:productsReducer,
        productDetails:productDetailSReducer,
        account:accountReducer
    }
})

export default store