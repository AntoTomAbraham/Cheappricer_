var express = require('express')
const app=express();


app.get('/',(req,res)=>{
    res.render('product/home')
})




module.exports=app;

