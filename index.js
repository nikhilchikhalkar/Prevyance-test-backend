const express = require("express");
const connectDB = require("./config/db");
const UserRoute = require("./router/UserRoute");
const Auth = require("./middleware/Auth");
const UsersInfoRoute = require("./router/UsersInfoRoute.js");
const orderRoutes = require("./router/OrderRoute.js");
require('dotenv').config();  // This loads the .env file

const app = express();

app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json('server running sucessfuly')
})

app.use('/user',UserRoute)
app.use(Auth)
app.use('/users',UsersInfoRoute)
app.use('/orders', orderRoutes);

// app.use('/blog',BlogRoute)


const PORT = 5000;
app.listen(PORT,()=>{
    connectDB();
    console.log(`server running on port ${PORT}`);
})