const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        trim:true,
        required:true,
    },
    lastname:{
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
    },
    isConfirmed:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model("User",userSchema)
