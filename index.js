//Importing Dependecies
const express=require('express')
const app=express()
const mongoose=require('mongoose')
//setting configuration
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views', __dirname+'/views')

//Configuring Database
mongoose.connect("mongodb://localhost:27017/mydb",()=>console.log("DB connected"))


//importing routes
const authRouter=require('./routes/auth')

//setting routes
app.use('/auth',authRouter);

app.get('/',(req,res,next)=>{
    res.send("hello world")    
})

app.listen(1000)