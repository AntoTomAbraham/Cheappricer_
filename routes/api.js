var express = require('express')
var router = express.Router()
const fs = require("fs");
const Product=require('../model/product')
const bodyParser = require('body-parser');
const product = require('../model/product');
router.use(bodyParser.json())

const app=express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",(req,res)=>{
    res.send("API")
})

app.get("/priceData",(req,res)=>{
    res.send(req.query.proId)
})
module.exports=app;