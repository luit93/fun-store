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
import UserEntry from "./components/users/UserEntry";
import UserOptions from "./components/layout/header/UserOptions"
// import Loader from "./components/layout/loader/Loader";
// import Layout from "./components/layout/Layout";
import store from "./store"
import { getUserDetails } from "./actions/accountAction";
import { useSelector } from "react-redux";
import UserProfile from "./components/users/UserProfile";
import PrivateRoute from "./components/route/PrivateRoute";
function App() {

  const {user,isAuth}= useSelector((state)=>state.account)
  // console.log(user,isAuth)
  // console.log("first",user.user)
  React.useEffect(() => {
    // if(user){store.dispatch(getUserDetails())}
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
 
  }, [user]);
  return (
   
      <Router>
       <Header/>

      {isAuth && <UserOptions user={user} />}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<UserEntry />} />
          {/* <Route path="/profile" element={<UserProfile />} /> */}
          <Route exact path="/profile" element={<PrivateRoute/>}>
          <Route path="/profile" element={<UserProfile />} />
          </Route>
          
          
          
          {/* <Route path="/loading" element={<Loader />} /> */}

        </Routes>
        <Footer/>
      </Router>
   
  );
}

export default App;
