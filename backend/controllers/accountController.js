const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Account = require("../models/AccountModel");
const sendToken = require("../utils/jwtTokenSender");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");
const crypto = require("crypto");
//register new user
exports.registerAccount = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const account = await Account.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  const jwtToken = account.getJWTToken();

  sendToken(account, 201, res);
});

//LOGIN
exports.loginAccount = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  const account = await Account.findOne({ email }).select("+password");
  if (!account) {
    return next(new ErrorHandler("invalid email or password", 401));
  }

  const passwordValid = await account.comparePassword(password);
  if (!passwordValid) {
    return next(new ErrorHandler("invalid email or password", 401));
  }

  const jwtToken = account.getJWTToken();

  sendToken(account, 200, res);
});

//LOGOUT
exports.logoutAccount = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out succesully",
  });
});

//forgot password- sends link to reset password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const account = await Account.findOne({ email: req.body.email });
  if (!account) {
    return next(new ErrorHandler("User not found", 404));
  }

  //get reset password token
  const resetToken = await account.getResetPasswordToken();
  await account.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset link is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendEmail({
      email: account.email,
      subject: `Password Reset Link`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Password reset link has been sent to ${account.email}`,
      resetPasswordUrl,
    });
  } catch (error) {
    account.resetPasswordToken = undefined;
    account.resetPasswordExpiry = undefined;
    await account.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset old password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //hashing token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const account = await Account.findOne({
    resetPasswordToken,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!account) {
    return next(
      new ErrorHandler("Reset Password Token invalid or expired", 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }
  account.password = req.body.password;
  account.resetPasswordToken = undefined;
  account.resetPasswordExpiry = undefined;
  await account.save();
  sendToken(account, 200, res);
});

//get account details
exports.getAccountdetails = catchAsyncErrors(async (req, res, next) => {
  const account = await Account.findById(req.user.id);
  res.status(200).json({
    success: true,
    account,
  });
});
//update password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const account = await Account.findById(req.user.id).select("+password");
  const passwordValid = await account.comparePassword(req.body.oldPassword);
  if (!passwordValid) {
    return next(new ErrorHandler("invalid old password", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("The passwords don't match", 400));
  }
  account.password = req.body.newPassword;
  await account.save();

  sendToken(account, 200, res);
});
//update account details
exports.updateAccountDetails = catchAsyncErrors(async (req, res, next) => {
  const updateData = {
    name: req.body.name,
    email: req.body.email,
  };
  const account = await Account.findByIdAndUpdate(req.user.id, updateData, {
    new: true,
  });

  res.status(200).json({ success: true });
});

//get all user accounts -- admin
exports.getAllAccounts = catchAsyncErrors(async (req, res, next) => {
  const accounts = await Account.find();
  return res.status(200).json({
    success: true,
    accounts,
  });
});

//get single user account -- admin
exports.getSingleAccount = catchAsyncErrors(async (req, res, next) => {
  const account = await Account.findById(req.params.id);
  if (!account) {
    return next(
      new ErrorHandler(`No account with id:${req.params.id} found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    account,
  });
});

//update account role -admin
exports.updateAccountRole = catchAsyncErrors(async (req, res, next) => {
  const updateData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const account = await Account.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  res.status(200).json({ success: true });
});
//delete account -admin
exports.deleteAccount = catchAsyncErrors(async (req, res, next) => {
  const account = await Account.findById(req.params.id);
  if (!account) {
    return next(
      new ErrorHandler`User does not exist with Id: ${req.params.id}`(),
      400
    );
  }
  await account.remove();

  res
    .status(200)
    .json({ success: true, message: "Account successfully deleted" });
});
