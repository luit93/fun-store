const ErrorHandler = require('../utils/errorHandler')

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

      // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //mongodb dupicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  //jwt invalid error
  if (err.code === 'JsonWebTokenError') {
    const message = `Json Web Token is invalid`;
    err = new ErrorHandler(message, 400);
  }
  //jwt expired error
  if (err.code === 11000) {
    const message = `Json Web Token has expired`;
    err = new ErrorHandler(message, 400);
  }
    return res.status(err.statusCode).send({
        success: false,
        message: err.message,
      });

}