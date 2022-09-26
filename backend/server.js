const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/database')
const cloudinary= require("cloudinary")
//config
dotenv.config({path:'backend/config/config.env'})

//handling uncaught exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down server due to uncaught exception")
    
        process.exit(1);
      
})
//connect to db
connectDB()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, ()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`)
})


//unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down server due to unhandled promise rejection")
    server.close(() => {
        process.exit(1);
      });
})