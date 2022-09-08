import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    user:{},
    isAuth:false,
    error:null
}
const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers:{
        fetchLoginLoading:(state)=>{
            state.isLoading=true
            state.isAuth=false
        },
        fetchLoginSuccess:(state,action)=>{
            state.user= action.payload
            state.isAuth=true
            
        },
        fetchLoginFail:(state,action)=>{
            state.isLoading=false
            state.isAuth=false
            state.user=null
            state.error=action.payload
        },
        fetchRegisterLoading:(state)=>{
            state.isLoading=true
            state.isAuth=false
        },
        fetchRegisterSuccess:(state,action)=>{
            state.user= action.payload
            state.isAuth=true
            
        },
        fetchRegisterFail:(state,action)=>{
            state.isLoading=false
            state.isAuth=false
            state.user=null
            state.error=action.payload
        },
        clearErrors:(state)=>{
            state.error=null
        }
    }

})

const {reducer,actions} = accountSlice
export const {fetchLoginLoading,fetchLoginSuccess,fetchLoginFail,clearErrors,fetchRegisterLoading,fetchRegisterSuccess,fetchRegisterFail} = actions
export default reducer