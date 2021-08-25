const mongoose=require("mongoose")

const GoogleuserSchema=new mongoose.Schema({
    googleId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    }
})
module.exports=mongoose.model("Googleuser",GoogleuserSchema)