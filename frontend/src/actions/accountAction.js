import {fetchLoginLoading,fetchLoginSuccess,fetchLoginFail,clearErrors,fetchRegisterLoading,fetchRegisterSuccess,fetchRegisterFail} from "../reducers/accountSlice"
import {accountLoginApi,accountRegisterApi} from "../api/accountApi"

export const accountLogin=(email,password)=>async(dispatch)=>{
    dispatch(fetchLoginLoading())
    try {
        const result = await accountLoginApi(email,password)
        dispatch(fetchLoginSuccess(result.data))
        
    } catch (error) {
        dispatch(fetchLoginFail(error.message))
    }
}
export const accountRegister=(accountData)=>async(dispatch)=>{
    dispatch(fetchRegisterLoading())
    try {
        const result = await accountRegisterApi(accountData)
        dispatch(fetchRegisterSuccess(result.data))
        
    } catch (error) {
        dispatch(fetchRegisterFail(error.message))
    }
}

export const clearAccountErrors=()=> async(dispatch)=>{
    dispatch(clearErrors())
}