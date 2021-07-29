var express = require('express')
var router = express.Router()
const Product=require('../model/product')

router.post('/signin',(req,res)=>{
    const {email, password}=req.body;
    if(email== "admin@cheappricer.in" && password=="kochilive@_2021"){
        return res.status(200).json({message:"signin"})
        
    }else{
        return res.status(200).json({message:"signin failed"}) 
    }
})

router.post('/create',(req,res)=>{
   const {proId,proUrl,category,subCategory,imgLink,brand,desc}=req.body;
    
    
   console.log(req.body)
   let product= new Product(req.body)
   product.save((err,product)=>{
       if(err){
           console.log(err)
                res.status(400).json({
                    error:"Error saving"
                })
            }else{
                res.json(product)
                console.log("Saved")
            }
   })

})




module.exports=router;

