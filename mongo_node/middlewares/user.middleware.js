import jwt from "jsonwebtoken";
import "dotenv/config";
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
 export const isLoggedIn=async(req,res,next)=>{
   try {
     const headerToken=req.headers['authorization'];
    if(!headerToken){
        return next();
    }
    if(!headerToken.startsWith("Bearer")){
        return res.status(401).json({
            error:"bearer must be provided with token",
        })
         
    }
    const token=headerToken.split(" ")[1];
    const data=jwt.verify(token,process.env.JWT_SECRET);
     req.user=data;
    return next();
   } catch (error) {
     return next();
   }
}
export const ensureAuthenticated= async(req,res,next)=>{
    const user=req.user;
    if(!user){
        return res.status(400).json({
            error:"you are not logged-in",
            respone:"ensureAuthenticated",
        })
    }
    return next();
}