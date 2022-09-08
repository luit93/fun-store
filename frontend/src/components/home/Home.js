import React, { Fragment, useEffect } from "react";
import "./Home.css";
import { CgMouse } from "react-icons/cg";
import ProductCard from "../cards/ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearProductErrors, fetchAllProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
const Home = () => {
    const alert= useAlert()
  const dispatch = useDispatch();
  const { isLoading, error, products } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if(error){
     alert.error(error)
     dispatch(clearProductErrors())

    }
    dispatch(fetchAllProducts());
  }, [dispatch,error,alert]);

  return (
    <Fragment>
      {" "}
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Fun Store" />
          <div className="banner">
            <p>Luit's Super Cool Store</p>
            <h1>Find what you desire</h1>
            <a href="#container">
              <button>
                Dummy <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="heading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;
