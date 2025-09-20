import db from "../db/index.js";
import { userSession,usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken"
import express from "express";
import "dotenv/config";
const app=express();
// export const usersData=async (req,res,next)=>{
//     const sessionId=req.headers['session-id'];
//     if(!sessionId){
//     return next();
//     };
//     const [data]=await db.select({
//                     session_id: userSession.id,
//                     userId: userSession.userId,
//                     id: usersTable.id,
//                     name: usersTable.name,
//                     email: usersTable.email,  
//                     }).from(userSession)
//                     .where((table)=>eq(table.session_id,sessionId))
//                      .rightJoin(usersTable,eq(usersTable.id,userSession.userId))
//      if(!data){
//    return next();
//     };
//     req.user=data;
//     return next();
// }

//

//

export const usersData=async (req,res,next)=>{
  try {
      const headresToken=req.headers['authorization'];
    if(!headresToken){
    return next();
    };
    if(!(headresToken.startsWith('Bearer'))){
      return next();
    };
    console.log(headresToken);
    const token=headresToken.split(" ")[1];
    console.log(token);
   const decoded=jwt.verify(token,process.env.JSON_SECRET_KEY)
   
    req.user=decoded;
    return next();
  } catch (error) {
    console.log("you entered incorrect web token");
    next();
  }
}
export const isAuthenticated=async(req,res,next)=>{
  if(!req.user){
    return res.status(401).json({
      error:"You are not logged in",
    })
  }
  return next();
}
export const tokenGeneration=async(req,res,next)=>{
  const user=req.user;
  const [data]= await db.select({
    id:usersTable.id,
    name:usersTable.name,
    email:usersTable.email,
  })
                      .from(usersTable)
                      .where(table=>eq(table.email,user.email));
  const payload={
    id:data.id,
    name:data.name,
    email:data.email,
  }
  const token=jwt.sign(payload,process.env.JSON_SECRET_KEY);
  console.log(`token Genereation ${token}`);
  const message=req.message;
  return res.json({
    token:token,
    message
  })
}
export const verify=(role)=>{
  return async function adminVerfication(req,res,next) {
    if(role!==req.user.role){
      return res.status(401).json({
        error:"you are not authorized to this",
      })
    }
    return next();
  }
}