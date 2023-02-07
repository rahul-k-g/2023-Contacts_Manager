const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;


const UserSchema=new Schema({
    email:{type:String,unique:true, required:true }
    ,password:{type : String, required:true},
    userPhotoUrl:{type:String,default:"https://img.freepik.com/free-icon/user_318-790139.jpg"},
    name: String,
    accessDesignation: {type :String, default:"normal" }
})

const UserModel = mongoose.model('users', UserSchema ); 
module.exports = UserModel;