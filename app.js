const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
require('dotenv/config');
const app= express()
var jwt = require('jsonwebtoken');
mongoose.set('strictQuery', true);
//connection to db
mongoose.connect("mongodb+srv://dushyantBhardwaj:dushyant@cluster0.iemcleq.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('database Connected!'))
    .catch((err) => console.log('Error!!! to connect the database'+err.message))




//import model
const userModel = require("./src/models/contactModels")

//middlewares
app.use(express.json()); //send back respond in json format
app.use(morgan("tiny"));// it will give time taken when api is login to our console

//token verification
const tokenVerification = (req,res,next)=>{
  if(req.headers.authorization){
      const token = req.headers.authorization;
      if(token){
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
          if(err){
            return res.status(403).json({
              status:"Failed",
              Error:err.name,
              message:err.name=="JsonWebTokenError"?"Not a valid Token. Pls login again":err.message
            })
          }
          req.userID = decoded.data;
          next();
        })
      }else{
        return res.status(403).json({
          status:"Failed",
          message:"Token is missing"
        })
      }
  }else{
    return res.status(403).json({
      status:"Failed",
      message:"unauthorised access. Pls login before access"
    })
  }
}

//routes path
app.use("/api/v1",require("./src/Routes/userRoute"));

app.use("/api/v1",require("./src/Routes/contactRoute"));

//Welcome Page
app.use("/",(req,res)=>{
    res.status(200).json({
      status:"Success",
      message: "Welcome to contact-manager-app-backend-API. we service two APIs which are /api/users and /api/contacts"
    })
  })


//bad request
app.use('/*',(req, res)=>{
    res.status(404).json({
      status: 'Failed',
      message: '404! not found'
    })
})
  //server Configurations
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=> console.log(`server listening on port ${PORT}`))