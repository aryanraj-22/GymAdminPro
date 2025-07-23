require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL,{
    
    serverSelectionTimeoutMS: 5000,})
  .then(() => console.log('DB connection successful!')).catch(err=>{
    console.log(err.message)
  });