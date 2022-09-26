const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')
const cors = require("cors");
const fileUpload = require("express-fileupload")


app.use(cors());

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
//set body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//router imports
const product = require('./routers/productRouter')
const account = require('./routers/accountRouter')
const order = require('./routers/orderRouter')



app.use('/api/v1',product)
app.use('/api/v1',account)
app.use('/api/v1',order)

//middleware for errors
app.use(errorMiddleware)


module.exports =app