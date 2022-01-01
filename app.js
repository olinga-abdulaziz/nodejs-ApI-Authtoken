const express=require('express')
const jwt=require('jsonwebtoken')


const app=express()

app.get('/api',(req,res)=>{
    res.json({
        message:"welcome to our api"
    })
})

app.post('/api/post', verifyToken, (req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message:'post created',
                authData
            })
        }
    })
   
})

app.post('/api/login',(req,res)=>{

    const user={
        id:1,
        username:'brad',
        email:'brad@gmail.com'
    }
    jwt.sign({user},'secretkey',{expiresIn:'30s'},(err,token)=>{
        res.json(token)
    })
})

// verify token 
function verifyToken(req,res,next){
    // get header value
    const bearerHeader=req.headers['authorization'];
    //check if bearer is undefine
    if (typeof bearerHeader !== 'undefined') {
        // re formatting the token

        const bearer=bearerHeader.split(' ')
        const bearerToken=bearer[1]

        req.token=bearerToken
        next()

    }else{
        res.sendStatus(403)
    }
}


app.listen(3000,()=>console.log("server started ...."))