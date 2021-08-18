const express = require('express')
const User=require('../model/user')
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser')

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.get('/login',(req,res)=>{
    res.render('auth/login')
})

app.get('/signup',(req,res)=>{
    res.render('auth/signup')
})


app.post('/signup',(req,res)=>{
    const {firstname,lastname,email, password}=req.body;
    console.log(req.body+"req.body");
    bcrypt.hash(req.body.password,null,null, function (err,hash){
        if(err){
            console.log(err)
            return res.status(500).json({error:err})
        }else{
            const user=new User({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:hash,
            })
            user.save((err,user)=>{
                if(err){
                    console.log(err)
                    return res.status(400).json({
                        err:"NOT able to save user in DB"
                    })
                }
                res.json({
                    msg:"saved"
                })
            })
        }
    });
})


app.post('/login',(req,res)=>{
    console.log(req.body)
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        console.log(user)
        if(user.length<1){
            res.json({
                msg:"No user"
            })  
        }
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    console.log(err)
                    res.json({msg:"Failed"})
                }
                if(result){
                    return res.json({msg:"successfull"})
                }
            })
    })
})

module.exports=app;