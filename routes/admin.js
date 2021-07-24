var express = require('express')
var router = express.Router()

router.post('/signin',(req,res)=>{
    const {email, password}=req.body;
    if(email== "admin@cheappricer.in" && password=="kochilive@_2021"){
        return res.status(200).json({message:"signin"})
        
    }else{
        return res.status(200).json({message:"signin failed"}) 
    }
})

router.post('/create',(req,res)=>{
    const {productId,productLink,category,subCategory,brand,imageLink,description}=req.body;

})




module.exports=router;

