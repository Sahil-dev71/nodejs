import express from 'express';
import {createHmac, randomBytes} from "crypto";
import User from '../models/user.model.js';
import jwt from "jsonwebtoken";
import { isLoggedIn,ensureAuthenticated } from '../middlewares/user.middleware.js';
const router=express.Router();
router.post("/signup",async (req,res)=>{
   try {
     const {name,email,password}=req.body;
    const existingUser=await User.findOne({
        email,
    });
    if(existingUser){
        return res.status(400).json({
            error:`user with email ${email} already exists`,
        })
    }
    const salt= randomBytes(256).toString('hex');
    const hashedPasswoed=createHmac("sha256",salt)
    .update(password)
    .digest("hex");
    const data=await User.insertOne({
         name,
         email,
         password:hashedPasswoed,
         salt,
    });
    return res.json({
        status:"success",
        _id:data._id,
    })
   } catch (error) {
     return res.json({
        error,
     })
   }
})
router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const isExists=await User.findOne({
        email,
    });
    if(!isExists){
        return res.status(404).status({
            error:`user with email ${email} doesn't exists`,
        })
    };
    const salt=isExists.salt;
    const hashed=isExists.password;
    const newHashed=createHmac('sha256',salt)
    .update(password)
    .digest("hex");
    if(hashed!==newHashed){
        return res.status(400).json({
            error:"incorrect password",
        })
    };
    const payload={
        _id: isExists._id,
        name:isExists.name,
        email: isExists.email,
    }
    const token=jwt.sign(payload,process.env.JWT_SECRET);
    return res.json({
        token,
    })
})
router.use(isLoggedIn);
router.get("/",ensureAuthenticated,async(req,res)=>{
    const user=req.user;
    return res.json({
        user,
    })
})

router.patch("/",ensureAuthenticated,async(req,res)=>{
    const {name}=req.body;
    if(!name){
        return res.status(400).json({
            error:"name is not provided",
        })
    }
    const updates=await User.findByIdAndUpdate(req.user._id,{name});
    const payload={
        id: req.user._id,
        name,
        email:req.user.email,
    };
    const token=jwt.sign(payload,process.env.JWT_SECRET);
    
    return res.status(201).json({
        status:"success",
        updated:`${name}`,
        token,
    })
})
export default router;