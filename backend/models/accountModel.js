const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto')
const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [50,"Can't exceed 50 chars"],
        minLength: [3,"must be atleast 3 chars"],
      },
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
      },
      password:{
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength:[8,"Password must be at least 8 chars"],
        select:false
      },
      avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      role:{
        type:String,
        default:"user"
      },
      createdAt:{
        type:Date,
        default:Date.now()
      },
      resetPasswordToken:String,
      resetPasswordExpiry:Date
})


//hashing password
AccountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWT tokens
AccountSchema.methods.getJWTToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

//cpmpare password
AccountSchema.methods.comparePassword =  async function(password){
  return await bcrypt.compare(password,this.password )
}

//password reset token
AccountSchema.methods.getResetPasswordToken = async function(){
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex")
  // console.log(resetToken)
  //hash resetToken and save to Schema as resetPasswordToken
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
  this.resetPasswordExpiry = Date.now()  + 15 * 60 * 1000
  return resetToken
}

module.exports= mongoose.model("Account",AccountSchema)