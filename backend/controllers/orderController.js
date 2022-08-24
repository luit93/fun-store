const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


//create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    userAccount: req.user.id
  });

  res.status(201).json({
    success:true,order
  })
});

//getting a single order
exports.getSingleOrder = catchAsyncErrors( async(req,res,next)=>{
const order = await Order.findById(req.params.id).populate("userAccount","name email")
if(!order){
    return next(new ErrorHandler("No Order found with this Id",404))
}
res.status(200).json({
    success:true,
    order
})
})
//getting all orders for a user account
exports.getUserOrders = catchAsyncErrors( async(req,res,next)=>{
const orders = await Order.find({user:req.user.id})

res.status(200).json({
    success:true,
    orders
})
})

//getting every order -admin
exports.getAllOrders = catchAsyncErrors( async(req,res,next)=>{
const orders = await Order.find()

let totalAmount = 0
orders.forEach(order=>{totalAmount+=order.totalPrice})

res.status(200).json({
    success:true,
    totalAmount,
    orders
})
})

//update order status-- admin
exports.updateOrder = catchAsyncErrors( async (req,res,next)=>{
const order = await Order.findById(req.params.id)

if(!order){
    return next(new ErrorHandler("No Order found with this Id",404))
}

if(order.orderStatus === "Delivered"){
    return next(new ErrorHandler("The order has already been delivered",400))
}
order.orderItems.forEach(async (o)=>{
    await updateStock(o.product,o.quantity)
})

order.orderStatus = req.body.status
if(req.body.status === "Deilvered"){
    order.deliveredAt = Date.now()

}
await order.save({validateBeforeSave:false})
res.status(200).json({
    success:true,
    order
})
})

async function updateStock(id,quantity){
    const product = await Product.findById(id)
    product.stock-= quantity
    await product.save({validateBeforeSave:false})
}

//delete order-- admin
exports.deleteOrder = catchAsyncErrors( async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    
    if(!order){
        return next(new ErrorHandler("No Order found with this Id",404))
    }
    await order.remove()
    res.status(200).json({
        success:true,
        
    })
    })
    
    //update or