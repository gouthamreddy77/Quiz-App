var express = require('express');
var mongoose = require("mongoose")
var dotenv = require("dotenv")
var cookieparser = require("cookie-parser")
var cors = require("cors")
var app = express();

dotenv.config()
app.use(express.json()) // body parser
app.use(cookieparser())
app.use(cors())

require('./db/conn')     // connection to db
app.use("/user",require("./routes/userrouting"))
app.use("/customer",require("./routes/customerrouting"))
app.use("/data",require('./routes/datarouting')) // server router

const port = process.env.PORT || 5000
app.listen(port,'0.0.0.0',() => console.log(`server is listening at ${port}`) ) //server