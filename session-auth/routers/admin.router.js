import express from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { isAuthenticated, verify } from "../middlewares/app.middleware.js";
const router=express.Router();
router.use(verify("ADMIN"));
router.get("/all_user",isAuthenticated,async(req,res)=>{
    const users=await db.select({
        id:usersTable.id,
        name:usersTable.name,
        email:usersTable.email,
    })
                        .from(usersTable)
       return res.json({
        ...users
       })                 
})
export default router;