import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";

import { useSelector, useDispatch } from "react-redux";
import {
  clearProductErrors,
  fetchAllProducts,
} from "../../actions/productAction";
import Loader from "../layout/loader/Loader";
import ProductCard from "../cards/ProductCard";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";

const categoryList = [
  "laptop",
  "console",
  "hats",
  "Accessories",
  "toys",
  "phone",
  "Attire",
  "snacks",
  "Sneakers",
];

const Products = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isLoading, products, error, totalProducts, productsPerPage,filteredCount } =
    useSelector((state) => state.products);
  //   console.log(products, totalProducts, productsPerPage);
  const keyword = useParams();
  const [currPage, setCurrPage] = useState(1);
  const [price, setPrice] = useState([0, 9000]);
  const [categories, setCategories] = useState("");
  const [ratings, setRatings] = useState(0);

  const handleCurrentPage = (e) => {
    setCurrPage(e);
  };

  const handlePrice = (event, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearProductErrors());
    }
    dispatch(
      fetchAllProducts(keyword.keyword, currPage, price, categories, ratings)
    );
  }, [dispatch, alert, error, keyword, currPage, price, categories, ratings]);

    let count = filteredCount
  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>

            <MetaData title="Products"/>
          <h2 className="product-heading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          
          <div className="filter-box">
            <Typography className="filter-heading">Price</Typography>
            <Slider
              color="warning"
              value={price}
              valueLabelDisplay="auto"
              size="small"
              step={100}
              onChange={handlePrice}
              aria-labelledby="range-slider"
              min={0}
              max={10000}
            />
            <Typography className="filter-heading">Categories</Typography>
            <ul className="categories-box">
              {categoryList.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategories(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography className="filter-heading" component="legend">
                Ratings
              </Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                color="warning"
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {productsPerPage <= totalProducts && (
            <div className="pagination-box">
              <Pagination
                activePage={currPage}
                itemsCountPerPage={productsPerPage}
                totalItemsCount={totalProducts}
                nextPageText="Next"
                onChange={handleCurrentPage}
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="item-active"
                activeLinkClass="link-active"
              />{" "}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
