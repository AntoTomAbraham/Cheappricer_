const express=require('express');
const app=express()
const bodyParser=require("body-parser")
const mongoose=require('mongoose');

const path=require('path')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("product/home")
})



const adminRoutes=require('./routes/admin')
const authRoutes=require('./routes/auth')
const productRoutes=require('./routes/products')
app.use('/admin',adminRoutes)
app.use('/auth',authRoutes)
app.use('/product',productRoutes)

mongoose.connect(
    "mongodb+srv://CheapPricer:Cheappricer@_2021@cluster0.ivs2l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED");
})


app.set('port', process.env.PORT || 8000);
console.log("++++++++++++++++" + app.get('port'));

const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`app is running @ ${port}`);
})
