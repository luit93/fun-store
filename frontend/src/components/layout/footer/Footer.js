import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import './Footer.css'
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <p>About</p>
        <p>Terms & Conditions</p>
        {/* <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" /> */}
      </div>

      <div className="midFooter">
        <h1>LUIT'S FUN STORE</h1>

        {/* <p> 2022 &copy; Luit</p> */}
      </div>

      <div className="rightFooter">
        <h4>Hire Me</h4>
        <a href="https://www.linkedin.com/in/luitsaikia/">LinkedIn</a>
        <a href="https://github.com/luit93">Github</a>
        
      </div>
    </footer>
  )
}

export default Footer