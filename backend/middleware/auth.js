const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const Account = require("../models/AccountModel");
const ErrorHandler = require("../utils/errorHandler");
exports.isUserAuth = catchAsyncErrors(async (req, res, next) => {
  const jwtToken = req.cookies.token;
  
  if (!jwtToken) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  //   console.log(jwtToken)
  const decodedData = jwt.verify(jwtToken, process.env.JWT_SECRET);

  req.user = await Account.findById(decodedData.id);
  console.log(req.user)
  next();
});

//check user role
exports.authorizarionRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not authorized access to this resource`,
          403
        )
      );
    }
    next();
  };
};
