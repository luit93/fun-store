const mongoose= require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'backend/config/config.env'})




const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URL).then((data)=>{
        console.log(`mongodb connected to host : ${data.connection.host}`)
    })
    
}

module.exports= connectDB