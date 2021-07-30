const express=require('express');
const app=express()
const bodyParser=require("body-parser")
const mongoose=require('mongoose');

app.use(bodyParser.json())
app.use(express.static('./client/build'));

app.get("/",(req,res)=>{
    return res.json("haiii")
})

const adminRoutes=require('./routes/admin')
app.use('/admin',adminRoutes)

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build")); // change this if your dir structure is different
//     app.get("*", (req, res) => {
//       res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
//   }

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build",     
    "index.html"));
 });

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
