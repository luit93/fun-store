const express = require('express')
const  {newOrder, getSingleOrder, getUserOrders, getAllOrders, updateOrder, deleteOrder}  = require('../controllers/orderController')
const router = express.Router()
const {isUserAuth,authorizarionRole} = require("../middleware/auth")


router.route("/order/new").post(isUserAuth,newOrder)
router.route("/order/:id").get(isUserAuth,getSingleOrder)
router.route("/orders/me").get(isUserAuth,getUserOrders)
router.route("/admin/orders").get(isUserAuth,authorizarionRole("admin"),getAllOrders)
router.route("/admin/orders/:id").put(isUserAuth,authorizarionRole("admin"),updateOrder).delete(isUserAuth,authorizarionRole("admin"),deleteOrder)

module.exports = router