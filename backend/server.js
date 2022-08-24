const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/database')

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