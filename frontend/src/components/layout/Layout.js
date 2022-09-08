import React from 'react'
import Header from "./header/Header.js"
import Footer from './footer/Footer'
const Layout = ({children}) => {
  return (
    <div>
        <header><Header/></header>
        <main>{children}</main>
        <footer><Footer/></footer>
    </div>
  )
}

export default Layout