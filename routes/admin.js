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
<<<<<<< HEAD
   
   const amazon=req.body.amazon
   const flipkart=req.body.flipkart
   const croma=req.body.croma
   const relaince=req.body.relaince
   const dell=req.body.dell

   const proId=req.body.proId
   const proUrl=req.body.proUrl
   const category=req.body.category
   const subCategory=req.body.subCategory
   const imgLink=req.body.imgLink
   const brand=req.body.brand
   const desc=req.body.desc
   const data={proId,proUrl,category,subCategory,imgLink,brand,desc}

   console.log(data)

   let product= new Product(data)
=======
   const {proId,proUrl,category,subCategory,imgLink,brand,desc}=req.body;
    
    
   console.log(req.body)
   let product= new Product(req.body)
>>>>>>> 507112f6fcf3e38b7b160391470d7b54e686f55b
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

