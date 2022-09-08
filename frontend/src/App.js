import "./App.css";

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Header from "./components/layout/header/Header.js";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/home/Home.js";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search"
import UserProfile from "./components/users/UserProfile";
// import Loader from "./components/layout/loader/Loader";
// import Layout from "./components/layout/Layout";

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
   
      <Router>
       <Header/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<UserProfile />} />
          
          {/* <Route path="/loading" element={<Loader />} /> */}

        </Routes>
        <Footer/>
      </Router>
   
  );
}

export default App;
