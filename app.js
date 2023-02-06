const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")

const app= express()

//connection to db
mongoose.connect("mongodb+srv://dushyantBhardwaj:dushyant@cluster0.iemcleq.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('database Connected!'))
    .catch((e) => console.log('Error!!! to connect the database'+e.message))




//import model
const userModel = require("./src/models/contactModels")
const contactModel = require("./src/models/userModel")





//middlewares
app.use(express.json())
app.use(morgan("tiny"))



//routes
app.get("/", (req,res)=>{
    res.send("hello world")
})

const PORT = process.env.PORT || 4000
app.listen(PORT,()=> console.log(`server listening on port ${PORT}`))