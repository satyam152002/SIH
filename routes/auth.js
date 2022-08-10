const express=require('express')
const router=express.Router()
const Camp=require("./../models/Camp")
//for signup
router.get('/',(req,res)=>{
    res.render('auth/signup')
})
router.post('/signup', async (req,res)=>{
    try
    {
        const {name,state,campID,password,campType,username}=req.body
        let camp=await Camp.findOne({username:username})
        const location=JSON.parse(req.body.location)
        let newCamp=new Camp({
            username:username,
            name:name,state:state,
            campID:campID,campType:campType,
            password:password,location:location})
        if(camp!=null) 
            return res.render('auth/signup',{error:"username already taken by another",camp:newCamp})
        await newCamp.save()
        return res.redirect('/auth/users')
    }
    catch(e)
    {
        res.sendStatus(500);
    }
})

//for SignIn
router.get('/signin',(req,res)=>{
    return res.render('auth/signin')
})

router.post('/signin',async (req,res)=>{
    const {username,password}=req.body    
    if(username==null|| password==null)
        return res.sendStatus(400)
    let camp=await Camp.findOne({username:username},{username:1,password:1})

    if(camp==null) return res.render('auth/signin',{error:"Username Does Not Exists"})

    if(camp.password!==password) return res.render('auth/signin',{error:"Invalid Password"})

    return res.redirect('/')
})

router.get('/users',async (req,res)=>{
    try
    {
        let users=await Camp.find({},{_id:0,name:1,state:1})
        console.log(users)
        res.render('./users',{users:users})
    } 
    catch (e) {
        res.sendStatus(500)        
    }
})


module.exports=router;