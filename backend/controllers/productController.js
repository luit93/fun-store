const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiMethods = require("../utils/apiMethods");

//create product= admin
exports.createProduct =catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body);
    if(product){
      res.status(201).json({ product,success: true });
  }else{
      res.send("error")
  }
    

    // return next(new ErrorHandler(error.message, 404));
    // res.status(500).json({success:false,message:error.message });

});
// exports.createProduct = async (req, res, next) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json({ success: true, product });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//     // res.status(500).json({success:false,message:error.message });
//   }
// };
//update product- admin
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, product });
  } catch (error) {
    return next(new ErrorHandler(error.message, error.status));
    //  return res.json({ message: error.name });
  }
};
//delete product- admin
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      // return res
      //   .status(404)
      //   .json({ success: false, message: "Product noty found" });
      return next(new ErrorHandler("Product noty found", 404));
    }
    await product.remove();
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    // return next(new ErrorHandler(error.message,404 ));
    return next(new ErrorHandler(error.message, error.status));
    //
  }
};

// get product details 
exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({ success: true, product });
  } catch (error) {

    return next(new ErrorHandler(error.message, 400));
  } 
};

exports.getAllProducts = catchAsyncErrors(async (req, res,next) => {
  // return next(new ErrorHandler("Testing Error",501))
  productsPerPage = 3;
  totalProducts = await Product.countDocuments()
  const apiMethod = new ApiMethods(Product.find(), req.query)
    .searchProducts()
    .filterCategory().pagination(productsPerPage)
    
  let products = await apiMethod.query;
  // apiMethod.pagination(8)
  
  res.status(200).json({ success: true,totalProducts, products,productsPerPage });
});


//create/update product reviews
exports.createProductReview = catchAsyncErrors( async (req,res,next)=>{
  const {rating,comment,productId} = req.body
  
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }
  // console.log(review)
  const product = await Product.findById(productId)
  const isReviewed = await product.reviews.find(review => review.user.toString() === req.user.id.toString())
  
if(isReviewed){
  product.reviews.forEach((review)=>{
    if(review.user.toString() === req.user.id.toString()){
      review.rating = rating
      review.comment = comment
    }
  })
} else{
  product.reviews.push(review)
  product.numReviews = product.reviews.length
}
  
  let avgRating = 0
  product.reviews.forEach(rev=>{
    avgRating+= rev.rating
  })
  product.ratings= avgRating/ product.reviews.length
  await product.save({validateBeforeSave:false})

  res.status(200).json({success:true})
}
)

//get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req,res,next)=>{
  const product = await Product.findById(req.query.prodId)
  if(!product){
    return next(new ErrorHandler("product not found",404))
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews
  })
})

//Delete review
exports.deleteReview = catchAsyncErrors( async (req,res,next)=>{
  const product = await Product.findById(req.query.productId)
  if(!product){
    return next(new ErrorHandler("product not found",404))
  }
  const reviews = product.reviews.filter(rev => (rev._id.toString() !== req.query.id.toString()) )

  let avgRating = 0
  reviews.forEach(rev=>{
    avgRating+= rev.rating
  })

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avgRating / reviews.length;
  }  
  const numReviews = reviews.length

  await Product.findByIdAndUpdate(req.query.productId,{reviews,ratings,numReviews},{new:true})

  res.status(200).json({
    success:true,
  })
})