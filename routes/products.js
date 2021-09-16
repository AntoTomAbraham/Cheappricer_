var express = require('express')
const app=express();


app.get('/',(req,res)=>{
    res.render('product/home')
})

app.get('/landing',(req,res)=>{
    res.render('product/landing')
})



module.exports=app;

