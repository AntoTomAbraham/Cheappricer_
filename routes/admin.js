var express = require('express')
var router = express.Router()
const fs = require("fs");
const Product=require('../model/product')
const bodyParser = require('body-parser')
router.use(bodyParser.json())
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
dotenv.config();

// require("dotenv").config()


const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

//Middleware for making protected route
const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,"shshshshshsh",(err,result)=>{
            if(err){
                res.redirect('/admin') 
            }else{
                next();
            }
        })
    }else{
        res.redirect('/admin')
    }
}

app.get('/',(req,res)=>{
    res.render('admin/adminAuth')
})

app.get('/signout',(req,res)=>{
    res.clearCookie("jwt");
    res.redirect('/admin')
})

//requireAuth is the middleware to make route protected
app.get('/dashBoard',requireAuth,async(req,res)=>{
    let len;
    await Product.find().count()
   .then(length=>{
       len=length;
   })
   var time=`${process.env.PRICE_UPD_TIME}`;
   var failures=`${process.env.FAILURES}`;
    res.render('admin/adminHome',{length:len,time:time,failures:failures});
})

//requireAuth is the middleware to make route protected
app.get('/dashBoard/additems',requireAuth,(req,res)=>{
    res.render('admin/admin');
});
app.get("/dashBoard/dbProducts",requireAuth,(req,res)=>{
    Product.find({},(err,data)=>{
        if(err){
            res.send(err);
        }
        else{
            //res.send(data[0]);
            res.render("admin/table",{data:data})
        }
    })
    //res.send("Products")
});



app.post('/create',async (req,res)=>{

   console.log(req.body+"req.body")
   var proId;
   //main-links-for scraping
   const amazon=req.body.amazon
   const flipkart=req.body.flipkart
   const croma=req.body.croma
   const relaince=req.body.reliance
   const dell=req.body.dell
   
   //affiliate links for end user. Note: If there are no aff. links, pls insert normal links!
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
  
   var file=fs.readFileSync('JSON_Data/product_data.json'); //reading JSON --product_data.json
   var objData=JSON.parse(file); //PARSING
    objData[arrId]={ //New data object
        "p_name":proUrl,
        "amazon_in":amazon,
        "flipkart":flipkart,
        "rel_digi":relaince,
        "croma":croma,
        "dell_pc":dell
        
    }
    //writing into JSON --product_data.json
    fs.writeFile('JSON_Data/product_data.json', JSON.stringify(objData,null,2), err => {
        // error checking
        if(err) throw err;
        
        console.log("New data added");
    });
    
    
    var fileAff=fs.readFileSync('JSON_Data/affiliate_data.json'); //reading JSON --affiliate_data.json
    var objDataAff=JSON.parse(fileAff); //PARSING
    objDataAff[arrId]={ //New data object
        "amazon_in":amazon_aff,
        "flipkart":flipkart_aff,
        "rel_digi":relaince_aff,
        "croma":croma_aff,
        "dell-pc":dell_aff
        
    }
    //writing into JSON --affiliate_data.json
    fs.writeFile('JSON_Data/affiliate_data.json', JSON.stringify(objDataAff,null,2), err => {
        // error checking
        if(err) throw err;
        
        console.log("New data added-Aff");
    });

    
    //db
   const data={proId,proUrl,category,subCategory,imgLink,brand,desc}
   console.log(data)
   

   let product= new Product(data)
   product.save((err,product)=>{
       if(err){
           console.log(err)
           res.redirect('/admin')
                // res.status(400).json({
                //     error:"Error saving"
                // })
        }
        else{
                res.redirect('/admin')
                // res.status(200).json(product)
                console.log("Saved")
            }  
    })

})

app.get('/Productjson',(req,res)=>{
    fs.readFile('JSON_Data/product_data.json',"utf8", (err, jsonString)=>{
        if(err){
            console.log("error")
        }else{
            //console.log(jsonString)
            res.json(JSON.parse(jsonString))
        }
    })
    //res.send("admin")
    
})

app.get('/Pricejson',(req,res)=>{
    fs.readFile('JSON_Data/price_data.json',"utf8", (err, jsonString)=>{
        if(err){
            console.log("error")
        }else{
            //console.log(jsonString)
            res.json(JSON.parse(jsonString))
        }
    })
    //res.send("admin")
    
})

//Creating token and saving it to Cookie!
app.post('/login', (req,res)=>{
    console.log("enterd into signin")
    const {email, password}=req.body;
    if(email== "admin@cheappricer.in" && password == "kochilive@_2021"){
        const token=jwt.sign({
            email:email
        },"shshshshshsh",
        {
            expiresIn:"1h"
        },
        );
        res.cookie('jwt',token,{httpOnly:true,maxAge:24000000000})
        res.redirect('/admin/dashBoard')
    }else{
        res.redirect('/admin')
      
    }

})




module.exports=app;

