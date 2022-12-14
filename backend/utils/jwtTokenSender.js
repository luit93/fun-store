//saves jwt in cookie
const sendToken=(user,statusCode,res)=>{
    const token = user.getJWTToken()
    const refreshToken= user.getRefreshToken(user._id)
// console.log('token=',token)

    //cookie options
    const cookieOptions ={

        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
}

res.status(statusCode).cookie("token",token,cookieOptions).json({
    success:true,
    user,
    token,
    refreshToken
})


}

module.exports = sendToken