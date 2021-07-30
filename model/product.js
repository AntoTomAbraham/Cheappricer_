const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    proId:{
        type:Number,
        trim:true,
        unique:true,
        required:true,
        maxlength:32
    },
    proUrl:{
        type:String,
        trim:true,
        required:true,
        maxlength:2000
    },
    category:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
    },
    subCategory:{
        type:String,
        trim:true,
        required:false,
        maxlength:32,
    },
    imgLink:{
        type:String,
        trim:true,
        required:false,
    },
    brand:{
        type:String,
        trim:true,
        required:false,
        maxlength:32,
    },
    desc:{
        type:String,
        trim:true,
        required:false,
    },
},{timestamps:true})

module.exports=mongoose.model("Product",productSchema)
