import React, { Fragment,useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import Loader from '../layout/loader/Loader'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import "./UserProfile.css"
const UserPage = () => {
    const {user,isLoading,isAuth} = useSelector((state)=>  state.account)
   const accountUser= user.user
    const navigate=useNavigate()
    useEffect(()=>{
        if(isAuth === false){
           navigate('/login')
        }

    },[isAuth,navigate])
  return (

    <Fragment>{isLoading? <Loader/>: 
    <Fragment>
    <MetaData title={`Hello ${accountUser.name} !`} />
    <div className='profile-container'>

    <div>
        <h1>My Profile</h1>
        <img src={accountUser.avatar.url} alt={accountUser.name}/>
        <NavLink to={`/me/update`}>Edit Profile</NavLink>
    </div>

    <div>
        <div> <h4>Name</h4><p>{accountUser.name}</p></div>
        <div> <h4>Email</h4><p>{accountUser.email}</p></div>
        <div>
        <NavLink to={`/orders`}>My Orders</NavLink>
        <NavLink to={`/password/update`}>Change Password</NavLink>
        </div>
    </div>

    </div>
</Fragment>
    }</Fragment>

   
  )
}

export default UserPage