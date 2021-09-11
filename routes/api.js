var express = require('express')
var router = express.Router()
const fs = require("fs");
const Product=require('../model/product')
const bodyParser = require('body-parser');
const product = require('../model/product');
router.use(bodyParser.json())

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

//json
var file=fs.readFileSync('JSON_Data/product_data.json'); //reading JSON --product_data.json
var product_data=JSON.parse(file);
var file1=fs.readFileSync('JSON_Data/price_data.json');
var price_data=JSON.parse(file1);

app.get("/",(req,res)=>{
    res.render("api/api")
})

//using productId with date
app.get("/priceData",(req,res)=>{
    if(req.query.date!=undefined){
        try{
            res.send(price_data[req.query.proId][req.query.date]);
        }
        catch{
            res.send("ERROR!")
        }
    }
    else{
        try{
            //when proid is ALL, all the price data in JSON is displayed! 
            if(req.query.proId=="ALL"){
                res.send(price_data);
            }
            else{
                res.send(price_data[req.query.proId]);
            }
        }
        catch{
            res.send("ERROR");
        }
        
    }

})



module.exports=app;


