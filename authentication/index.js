import express from "express";
const app=express();
const PORT=8000;
app.use(express.json());

const db={};
const emails=new Set();

app.post("/signup",(req,res)=>{
    const {name,email,password}=req.body;
    if(emails.has(email)) return res.status(400).json({
        "message":"email already existed"
    })
    if(!email) return res.json({
        message:"there is no email",
        status:"invalid request"})
   const token=`${Date.now()}`;
   console.log(token);
   db[token]={name,email,password};
   emails.add(email);
   return res.status(201).json({
    message:"your account is successfully created",
    token
   })
})
app.post("/login",(req,res)=>{
    const {token}=req.body;
    if(!token){
        return res.status(400).json({
            message:"token is missing"
        })
    }
    if(!(token in db)){
        return res.status(400).json({
            message:"invalid token"
        })
    }
    return res.json({
        message:'you are successfully logged in'
    })
})
app.post("/me",(req,res)=>{
    const {token}=req.body;
    if(!token)return res
                        .status(400)
                        .json({
                            message:'token is missing'
                        })
    if(!(token in db)) return res
                                .status(400)
                                .json({
                                    message:"invalid token"
                                })
    const data=db[token];
    return res.json({
        ...data
    })
})
app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
    
})