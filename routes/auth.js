var express = require('express')
const app=express();
const User=require('../model/user')

app.get('/login',(req,res)=>{
    res.render('auth/login')
})

app.get('/login',(req,res)=>{
    res.render('auth/signup')
})

app.post('/signup',(req,res)=>{
    const user=new User(req.body)
    user.save((err,user)=>{
        if(err){
            res.redirect('/login')
            // return res.status(400).json({
            //     err:"NOT able to save user in DB"
            // })
        }
        res.redirect('/product/home')
        // res.json({
        //     name:user.name,
        //     email:user.email,
        //     id:user._id
        // })
    })
})

app.post('/login',(req,res)=>{
})

module.exports=app;