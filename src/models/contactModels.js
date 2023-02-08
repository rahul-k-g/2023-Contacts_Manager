const mongoose = require("mongoose")
const schema = mongoose.Schema

const contactSchema = new schema({
    name: String,
    designation: String,
    company:String,
    industry:String,
    email:{type:String, required:true},
    phoneNumber:Number,
    Country:String,
    date:{type:String, default:Date.now()},
    created_by:{type:String, required:true}

})
const contactModel = mongoose.model("contacts", contactSchema)
module.exports = contactModel