var express = require("express");
var app = express();
const cors = require('cors');
require('dotenv').config()
var port = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');

app.use(cors({
 origin: [
    "http://localhost:3000",            
    "https://gym-admin-pro.vercel.app"   // production frontend
  ],
  credentials: true           
}));


app.use(express.json());
app.use(cookieParser());

require('./DBConn/conn');

const GymRoutes = require('./Routes/gym');
const MembershipRoutes = require('./Routes/membership');
const MemberRoutes = require('./Routes/member');


app.get('/',(req,res)=>{
  res.send("hello")
}) 

app.use('/auth',GymRoutes)
app.use('/plans',MembershipRoutes)
app.use('/members',MemberRoutes)


app.listen(port,()=>{console.log(`Our backend project is running on Port ${port}`)});