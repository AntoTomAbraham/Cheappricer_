const express=require('express');
const app=express()
const bodyParser=require("body-parser")
const mongoose=require('mongoose');

app.use(bodyParser.json())

app.get("/",(req,res)=>{
    return res.json("haiii")
})

const adminRoutes=require('./routes/admin')
app.use('/admin',adminRoutes)


mongoose.connect(
    "mongodb+srv://CheapPricer:Cheappricer@_2021@cluster0.ivs2l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
 {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED");
})

const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`app is running @ ${port}`);
})
