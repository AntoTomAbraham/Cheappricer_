const express = require('express')
const User=require('../model/user')
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser')
const {check,validationResult}=require('express-validator')
var validator = require("email-validator");
var _ = require('lodash');
var jwt = require('jsonwebtoken');
const nodemailer=require('nodemailer')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const Googleuser=require('../model/Googleuser')
const passport=require('passport')
const session=require('express-session')

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

//get route for login
app.get('/login',(req,res)=>{
    res.render('auth/login')
})

//get route to signup
app.get('/signup',(req,res)=>{
    res.render('auth/signup')
})

//post route for signup
app.post('/signup',[
    check('firstname')
    .isEmpty()
],(req,res)=> {
    const {firstname,lastname,email, password}=req.body;
    const errors=validationResult(req)
    if(errors.isEmpty()){
        return res.json({err:"error is there"})
    }
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        console.log(user.length+" user length")
        if(user.length<=0){
            console.log(req.body+"req.body");
            //hashing password
            bcrypt.hash(req.body.password,null,null, function (err,hash){
            if(err){
              console.log(err)
              return res.status(500).json({error:err})
            }else{
                //generate secrete token
                const token=jwt.sign({
                    email:email
                },"verification",
                {
                    expiresIn:"1h"
                },
                );
                //sending mail to the user for verification
                const linkk=`http://localhost:8000/auth/confirm/${email}/${token}`
                var transport=nodemailer.createTransport(
                    {
                        service:'gmail',
                        auth:{
                            user:"cheappricer.auth@gmail.com",
                            pass:"cheappricer@_2021"
                        }
                }
                )
                var mailOptions={
                    from:'cheappricer.auth@gmail.com',
                    to:email,
                    subject:"Confirmation link",
                    text:linkk,
                    html: `<a>${linkk}</a>`
                }
                transport.sendMail(mailOptions,(err,info)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log("done"+info.response)
                    }
                })
                const user=new User({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:hash,
            })
            //saving the user but isConfirmed:false
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
                // User.find({email:req.body.email})
                // .exec()
                // .then(user=>{
                //     if(user.length<1){
                //         res.json("user not found while user confirmation")
                //     }else{
                //         if(user.isConfirmed==true){
                //             res.json("true")
                //         }
                //     }
                // })     
            })
        }
    });
        }
        else{
            res.json({
                msg:"User already present"
            })  
        }
    })
    
})

//confirm mail URL
app.get('/confirm/:email/:token',(req,res)=>{
    const emaill=req.params.email;
    const token=req.params.token;
    const payload=jwt.verify(token,"verification")
    if(payload == ''){
        res.json('invalid payload')
    }
    console.log(payload.email+" email payload")
    const object={
        isConfirmed:true
    }
    if(payload.email==emaill){
    User.findOneAndUpdate({email:emaill},object)
    .exec()
    .then(user=>{
        if(user.length<1){
            res.json({
                msg:"No user"
            })  
        }else{
            res.json("entered to extend") 
        }
  })
}else{
    res.json("wrong token & email")
}  
})

//login route
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
                    const token=jwt.sign({
                        email:email
                    },"shshshshshsh",
                    {
                        expiresIn:"1h"
                    },
                    );
                    res.cookie('jwt',token,{httpOnly:true,maxAge:24000000000})
                    return res.json({msg:"successfull"})
                }
            })
    })
})

//get route for forgotpassword
app.get('/forgotpassword',(req,res)=>{})

//post route for forgotPassword
app.post('/forgotPassword',(req,res)=>{
    const {email}=req.body;
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(!user){
            res.json("user not found")
        }
        else{
            //sending link for reset password
            const secret="shshsh" + user.password
            const payload={
                email:user.email,
                firstname:user.firstname,
            }
            const token=jwt.sign(payload,secret,{expiresIn:'15m'})
            const link=`http://localhost:8000/auth/resetPassword/${user[0].email}/${token}`
            var transport=nodemailer.createTransport(
                {
                    service:'gmail',
                    auth:{
                        user:"cheappricer.auth@gmail.com",
                        pass:"cheappricer@_2021"
                    }
            }
            )
            var mailOptions={
                from:'cheappricer.auth@gmail.com',
                to:email,
                subject:"forgot link",
                text:link,
                html: `<a>${link}</a>`
            }
            transport.sendMail(mailOptions,(err,info)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log("done"+info.response)
                }
            })
            console.log(link)
            res.json(link)
        }
    })
})

//reset link
app.get('/resetPassword/:email/:token',(req,res,next)=>{
    const {email,token}=req.params;
    console.log(email);
    console.log(token)
    User.find({email:email})
    .exec()
    .then(user=>{
        if(!user){
            res.json("no user")
        }else{
            const secret="shshsh"+user.password;
            try{
            jwt.verify(token,secret,(err,decoded)=>{
                if(err){
                    console.log(err)
                    res.json(err)
                }else{
                const payload=jwt.verify(token,secret)
                console.log("success")
                res.render()
                }
            })
            }
            catch(err){
               console.log(err)
            }
        }
    })
})

app.post('/resetpassword',(req,res)=>{
    const {email,password,repassword}=req.body;
    if(password == repassword){
        bcrypt.hash(req.body.repassword,null,null, function (err,hash){
            if(err){
              console.log(err)
              return res.status(500).json({error:err})
            }else{
                const object={
                    password:hash
                }
                User.findOneAndUpdate({email:email},object)
                .then(user=>{
                    if(user.length<1){
                        res.json({
                            msg:"No user"
                        })  
                    }else{
                        res.json("entered to extend") 
                    }
              })
            }
        })
    }
})

//reset link after typing password
// app.post('/resetpassword/:email/:token',(req,res,next)=>{
//     const {email,password}=req.params;
//     const {repassword,reconPassord}=req.body;
//     //try
//     const secret="shshsh"+user.password;
//     const payload=jwt.verify(token,secret)
//     if(payload.email==email){
//     bcrypt.hash(req.body.repassword,null,null, function (err,hash){
//         if(err){
//           console.log(err)
//           return res.status(500).json({error:err})
//         }else{
//             const object={
//                 password:hash
//             }
//             User.findOneAndUpdate({email:email},object)
//             .then(user=>{
//                 if(user.length<1){
//                     res.json({
//                         msg:"No user"
//                     })  
//                 }else{
//                     res.json("entered to extend") 
//                 }
//           })
//         }
//     })
// }else{
//     res.json('no user')
 //}


//     ///main
//     // User.find({email:req.body.email})
//     // .exec()
//     // .then(user=>{
//     //     if(!user){
//     //         res.json("no user")
//     //     }else{
//     //         const secret="shshsh"+user.password;
//     //         try{
//     //             const payload=jwt.verify(token,"shshsh")
//     //             User.find({email:email})
//     //             .exec()
//     //             .then((user)=>{
//     //                 if(!user){
//     //                     res.json("no user found")
//     //                 }else{
//     //                     bcrypt.hash(req.body.repassword,null,null, function (err,hash){
//     //                         if(err){
//     //                           console.log(err)
//     //                           return res.status(500).json({error:err})
//     //                         }else{
//     //                             const obj={
//     //                                 password:hash
//     //                             }
//     //                             user=_.extend(user,obj)
//     //                             user.save((err,res)=>{
//     //                                 if(err){
//     //                                     res.json(err)
//     //                                 }else{
//     //                                     res.json(success)
//     //                                 }
//     //                             })
//     //                             res.json("updated")
//     //                         }
//     //                     })
//     //                     //ending bcrypt
//     //                 }
//     //             })
//     //         }
//     //         catch(err){
//     //             console.log(err)
//     //         }
//     //     }
//     // })
// })




passport.use(new GoogleStrategy({
    clientID:"298046608597-tovb9uj457h1vfpr8i58f30gu9up8pqq.apps.googleusercontent.com",
    clientSecret: "Jiu3vPG60O36oaETwESvtwtX",
    callbackURL: 'http://localhost:8000/auth/google/callback',
    passReqToCallback:true
},
async(accessToken,refreshToken,profile,done)=>{
    console.log(profile)
    const newUser={
        googleId:profile.id,
        name:profile.displayName,
        email:profile.email,
    }
    let user=await Googleuser.findOne({googleId:profile.id})
    if(user){
        done(null,user)
    }else{
        user =await Googleuser.create(newUser)
        done(null,user)
    }
}))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    Googleuser.findById(id,(err,user)=>done(err,user))
})

app.get('/success',(req,res)=>{
    res.render('/')
})

app.get('/failed',(req,res)=>{})

app.get('/google',passport.authenticate('google',{scope:['profile','email']}))

app.get('/google/callback',passport.authenticate('google',{failureRedirect:'/failed'}),
   function(req,res){ 
      res.redirect('/success')
   }
)

module.exports=app;
