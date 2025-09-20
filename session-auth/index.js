import express from "express";
import userRouter from "./routers/user.router.js";
import adminRouter from "./routers/admin.router.js"
import "dotenv/config";
import db from "./db/index.js";
import { userSession,usersTable } from "./db/schema.js";
import { eq } from "drizzle-orm";
import { usersData } from "./middlewares/app.middleware.js";
const app=express();
const Port=process.env.Port??8000;
app.use(express.json());
app.get("/",(req,res)=>{
    res.json({ 
        message:"user is on home page"
    })
});
// app.use(async (req,res,next)=>{
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
//      next();
// })
app.use(usersData) // middleware with external function call
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.listen(Port,()=>{
    console.log(`server is ON and running on PORT : ${Port}`);
    
})