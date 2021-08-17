const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:true,
    },
    Lastname:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        minLength:8,
    } 
},{timestamps:true})

module.exports=mongoose.model("User",userSchema)
