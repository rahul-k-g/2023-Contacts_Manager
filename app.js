const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
require('dotenv/config');
const app= express()
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

//import routes
// const UserRoute = require('./src/routes/UserRoute');

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