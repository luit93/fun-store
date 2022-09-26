import React from 'react'
import { NavLink } from 'react-router-dom'
import ReactNavbar from "overlay-navbar/dist/lib/ReactNavbar"
import logo from "../../../images/logo.png"
import "./Header.css"
import {BiSearchAlt,BiCartAlt,BiUser} from "react-icons/bi"

//material ui app bar tobe added






const options={
  burgerColor:"wheat",
    burgerColorHover: "orangered",
    logo,
  logoWidth: "15vmax",
  navColor1: "coral",
  logoHoverSize: "20px",
  logoHoverColor: "#eb4039",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  // link1Decoration:"underline  wavy",
  // link2Decoration:"underline  wavy",
  // link3Decoration:"underline  wavy",
  // link4Decoration:"underline  wavy",
  link1Size: "1.3vmax",
  link1Color: "wheat",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  searchIconMargin:"0.5vmax",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIcon:false,
  searchIconColor: "wheat",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "wheat",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
}
const Header = () => {
  return (
    <div className="header">
     <div><ReactNavbar className="navbar"  {...options}/> </div>
      <div className='top-right'>
        <NavLink to={`/login`} ><div><BiUser/></div></NavLink>
        <NavLink to={`/cart`} ><div><BiCartAlt/></div></NavLink>
        <NavLink to={`/search`} ><div><BiSearchAlt/></div></NavLink>
        
      </div>
      
      </div>
    
  )
}

export default Header