var express = require('express')
var router = express.Router()
const fs = require("fs");
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
    let proId;
    //retrieving id
    fs.readFile("JSON_Data/productId.json",(err,data)=>{
        if (err) throw err;
        const id = JSON.parse(data);
        proId=id["id"];
        console.log(proId);
    })

   const amazon=req.body.amazon
   const flipkart=req.body.flipkart
   const croma=req.body.croma
   const relaince=req.body.relaince
   const dell=req.body.dell

   //const proId=req.body.proId
   const proName=req.body.proUrl    //name changed
   const category=req.body.category
   const subCategory=req.body.subCategory
   const imgLink=req.body.imgLink
   const brand=req.body.brand
   const desc=req.body.desc


   const data={proId,proUrl,category,subCategory,imgLink,brand,desc}

   console.log(data)

   let product= new Product(data)
   product.save((err,product)=>{
       if(err){
           console.log(err)
                res.status(400).json({
                    error:"Error saving"
                })
            }else{
                res.json(product)
                console.log("Saved")
                proId++;
                let newId = {
                    "id": proId
                }  
                var NewId=fs.readFileSync('JSON_Data/productId.json');
                var myObject= JSON.parse(NewId);
                myObject.push(newId);
                var newData = JSON.stringify(myObject);
                fs.writeFile('JSON_Data/productId.json', newData, err => {
                    // error checking
                    if(err) throw err;
                    console.log("New data added");
                });   
            }
   })

})




module.exports=router;

