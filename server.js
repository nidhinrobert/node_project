const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const bodyparser=require("body-parser");
const path = require('path');
const bcrypt = require("bcrypt");
const connectDB=require('./server/database/connection');
const session = require("express-session");

const app=express();


dotenv.config({path :'config.env'})
const PORT=process.env.PORT||8080

// log requests
app.use(morgan('tiny'));




//mongodb connection
connectDB();

app.use(express.json())
// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

// Configure session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "12345",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1 * 60 * 60 * 1000,
        },
    })
);


// set view engine
app.set("view engine","ejs")

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css"))) 
app.use('/img',express.static(path.resolve(__dirname,"assets/img"))) 
app.use('/js',express.static(path.resolve(__dirname,"assets/js"))) 
app.use('/avatars',express.static(path.resolve(__dirname,"avatars")));

//load routers
app.use('/',require('./server/routes/router'))



app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});