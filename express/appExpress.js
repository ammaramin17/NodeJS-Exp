const express=require('express')
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken')
const port=1000
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
const username="ammar22";
const password="1234"
const jwtSecret="secertStr"


app.get('/employees',(req,res)=>{
    let tkn=req.cookies.ammarJWT
    if (!tkn){
        return res.status(401).send('no token')
    }
    try {
        const verifed=jwt.verify(tkn,jwtSecret)
        if (verifed.user===username){
            return res.status(200).json({message:"Access granted."})
        }
        else{
            return res.status(401).json({message:"Please login to access this resource."})
        }
        
    } catch (error) {
        return res.status(401).json({message:"error: "+error})
    }
    
})
app.post('/login',(req,res)=>{
    const {usr,pwd}=req.body
    if(usr===username && pwd===password){
        const token=jwt.sign({user:username},jwtSecret,{expiresIn:'1hr'})
        const cookieOptions = {
          expires: new Date(
            Date.now() + 2 * 60 * 1000
          ),
          httpOnly: true
        }
        res.cookie('ammarJWT',token,cookieOptions)
        return res.json(token)
    }
    return res.status(401).json({message:"Username or password is incorrect."})
})


const server=app.listen(port,()=>{
    console.log('listening in port '+port+"...");
})
