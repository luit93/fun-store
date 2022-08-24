const express= require('express')
const { getAllProducts,createProduct,updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController')

const {isUserAuth,authorizarionRole} = require("../middleware/auth")

const router = express.Router()
router.route('/products').get(getAllProducts)

router.route('/admin/product/new').post(isUserAuth,authorizarionRole("admin"),createProduct)
router.route('/admin/product/:id').put(isUserAuth,authorizarionRole("admin"),updateProduct).delete(isUserAuth,authorizarionRole("admin"),deleteProduct)
router.route('/product/:id').get(getProductDetails)
router.route('/review').put(isUserAuth,createProductReview)
router.route("/reviews").get(getProductReviews).delete(isUserAuth,deleteReview)
module.exports = router