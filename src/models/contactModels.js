const mongoose = require("mongoose")
const schema = mongoose.Schema

const contactSchema = new schema({
    name: String,
    designation: String,
    company:String,
    industry:String,
    email:{type:String, required:true},
    phoneNumber:Number,
    date:{type:String, default:Date.now()}


})
const contactModel = mongoose.model("contacts", contactSchema)
module.exports = contactModel