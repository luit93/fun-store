import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
// import { Paper, Button } from '@mui/material'
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearProductErrors,
  fetchProductDetails,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../cards/ReviewCard";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
const ProductDetails = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isLoading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { id } = useParams();
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 30,
    value: product.ratings,
    isHalf: true,
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearProductErrors());
    }
    dispatch(fetchProductDetails(id));
  }, [dispatch, id, alert, error]);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title= {`${product.name}`}/>
          <div className="product-details">
            <div>
              <Carousel className="carousel" height="300px">
                {product.images &&
                  product.images.map((img, i) => (
                    <img
                      className="carousel-pic"
                      key={img.url}
                      src={img.url}
                      alt={`image # ${i}`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="dtails">
              <div className="dtails-1">
                <h2>{product.name}</h2>
                <p>Product# {product._id}</p>
              </div>
              <div className="dtails-2">
                <ReactStars {...options} />
                <span>({product.numReviews} Reviews)</span>
              </div>
              <div className="dtails-3">
                <h1>${product.price}</h1>

                <div className="dtails-3-1">
                  <div className="dtails-3-1-1">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                  </div>{" "}
                  <button>Add to Cart</button>
                </div>

                <p>
                  Status:
                  <b
                    className={product.stock < 1 ? "red-color" : "green-color"}
                  >
                    {product.stock < 1 ? "Sold Out" : "In Stock"}
                  </b>
                </p>
              </div>

              <div className="dtails-4">
                Description:<p>{product.description}</p>
              </div>
              <button className="review-button">Submit Review</button>
            </div>
          </div>

          <h3 className="review-heading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="no-reviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
