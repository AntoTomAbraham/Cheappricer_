const express=require('express');
const app=express()
const bodyParser=require("body-parser")

app.use(bodyParser.json())

app.get("/",(req,res)=>{
    return res.json("haiii")
})

const adminRoutes=require('./routes/admin')
app.use('/admin',adminRoutes)




// mongoose.connect("mongodb://localhost:27017/product", {
//     useNewUrlParser: true,
//     useUnifiedTopology:true,
//     useCreateIndex:true
// }).then(()=>{
//     console.log("DB CONNECTED");
// })

const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`app is runnig @ ${port}`);
})
