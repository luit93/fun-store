import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const {isLoading,isAuth,user}= useSelector((state)=> state.account)
  return (!isLoading && ( isAuth?<Outlet/>:<Navigate to="/login"/>))
            
        }


export default PrivateRoute