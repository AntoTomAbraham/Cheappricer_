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




router.post('/create',async (req,res)=>{
   var proId;
   //main-links-for scraping
   const amazon=req.body.amazon
   const flipkart=req.body.flipkart
   const croma=req.body.croma
   const relaince=req.body.reliance
   const dell=req.body.dell
   //
   const amazon_aff=req.body.amazon_aff
   const flipkart_aff=req.body.flipkart_aff
   const croma_aff=req.body.croma_aff
   const relaince_aff=req.body.reliance_aff
   const dell_aff=req.body.dell_aff

   var proUrl=req.body.proUrl
   const category=req.body.category
   const subCategory=req.body.subCategory
   const imgLink=req.body.imgLink
   const brand=req.body.brand
   const desc=req.body.desc

    //splitting at space
   var proName=proUrl.split(" ");
   proUrl=proName.join("-");   //joining with - for routing purpo.
    
   
   let len;
   await Product.find().count()
   .then(length=>{
       len=length;
   })
   proId=len+1;  //id from mongdodb
   var arrId= String(proId);
  
   var file=fs.readFileSync('JSON_Data/product_data.json'); //reading JSON
   var objData=JSON.parse(file); //PARSING
    objData[arrId]={ //New data object
        "p_name":proUrl,
        "amazon_in":amazon,
        "flipkart":flipkart,
        "rel_digi":relaince,
        "croma":croma,
        "dell-pc":dell
        
    }
    //writing into JSON
    fs.writeFile('JSON_Data/product_data.json', JSON.stringify(objData,null,2), err => {
        // error checking
        if(err) throw err;
        
        console.log("New data added");
    });  

    //db
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
            }
   
  
   
})


})

module.exports=router;

