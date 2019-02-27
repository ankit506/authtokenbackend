const express =require('express');
const jwt=require('jsonwebtoken');
const index=express();
index.get('/api',(req,res)=> {
    res.json({
        message:'token generated'
    });
});

index.post('/api/posts',verifyToken, (req,res) => {
    jwt.verify(req.token,'secretkey',(err,authData) =>{
  if(err){
            res.sendStatus(403);
        }else{
    res.json({
        message:'token generated',authData
    });
}
});
});
index.post('/api/login',(req,res)=>{
   const user={
       User_Name:'ankit',
       email:'ankit@gmail.com'
       

   }
   
    jwt.sign({user},'secretkey',{expiresIn:'1d'},(err,token)=>{
        res.json({
            token
        });
    });
});
//format of token
//Authorisation: Bearer <acess Tokens>
//verify Token
function verifyToken(req,res,next){
    //get header value
    const bearerHeader= req.headers['authorisation'];
    //check if bearere is undefined
    if(typeof bearerHeader!== 'undefined'){
        //split at  the space
        const bearer =bearerHeader.split(' ');
        //get token from array
        const bearerToken=bearer[1];
        //set the token
        req.token=bearerToken;
        //next middleware
        next();
    }
else{
res.sendStatus(403);
}
}

index.listen(5000,()=> console.log('server started on 5000'));