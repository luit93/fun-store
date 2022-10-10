import {fetchLoginLoading,fetchLoginSuccess,fetchLoginFail,clearErrors,fetchRegisterLoading,fetchRegisterSuccess,fetchRegisterFail,getUserRequest,getUserSuccess,getUserFail,logoutSuccess,
    logoutFail} from "../reducers/accountSlice"
import {accountLoginApi,accountRegisterApi,getUserDetailsApi,logoutApi} from "../api/accountApi"

export const accountLogin=(email,password)=>async(dispatch)=>{
    dispatch(fetchLoginLoading())
    try {
        const result = await accountLoginApi(email,password)
// 
        sessionStorage.setItem('accessJWT', result.data.token)
        localStorage.setItem('refreshJWT',result.data.refreshToken)

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
export const getUserDetails=()=>async(dispatch)=>{
    dispatch(getUserRequest())
    try {
        const result = await getUserDetailsApi()
        dispatch(getUserSuccess(result.data))
        
    } catch (error) {
        dispatch(getUserFail(error.message))
    }
}

export const accountLogout=()=>async(dispatch)=>{
    try {
        const result = await logoutApi() 
        dispatch(logoutSuccess(result))
    } catch (error) {
        console.log(error)
        dispatch(logoutFail(error))
    }
}

export const clearAccountErrors=()=> async(dispatch)=>{
    dispatch(clearErrors())
}