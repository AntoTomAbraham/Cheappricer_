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
    res.send("API")
})

//using productId
app.get("/priceData",(req,res)=>{
    res.send(price_data[req.query.proId])

})



module.exports=app;


