import express from "express";
import db from "../db/index.js";
import { userSession, usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { randomBytes,createHmac } from "crypto";
import jwt from "jsonwebtoken"
import { isAuthenticated, tokenGeneration } from "../middlewares/app.middleware.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
       const { name, email, password,role } = req.body;
       if(!email){
        return res.status(400).json({
                            message:'you should have to provide email first!'
        })
       }
       const [existingUser] = await db
                                   .select()
                                   .from(usersTable)
                                   .where(table => eq(table.email, email));
       if (existingUser) {
         return res
                  .status(400)
                  .json({ message: `email ${email} is already signed in` });
       }
       const salt = randomBytes(256).toString("hex");
       const hashedPassword = createHmac("sha256", salt)
                                                       .update(password)
                                                       .digest("hex");
     
       const [data] = await db
                             .insert(usersTable)
                             .values({
                               name,
                               email,
                               password: hashedPassword,
                               salt,
                               role,
                             })
                             .returning({
                               id: usersTable.id,
         });
       return res
                .status(201)
                .json({
                  message: `user :${name} is signed up and there id is : ${data.id}`,
                  role:`you are a ${role}`
                });
});
router.post("/login",async (req,res)=>{
  const {email,password}=req.body;
  console.log(email);
  
  const [data]=await db.select({
                                id:usersTable.id, 
                                name:usersTable.name,
                                email:usersTable.email,
                                password:usersTable.password,
                                salt:usersTable.salt,
                                role:usersTable.role,
  })
                                .from(usersTable)
                                .where(table=>eq(table.email,email));
  console.log(data);
  
  if(!data){
    return res.status(400).json({
      message:"this email is not present"  
    })
  }          
  const salt=data.salt;
  const existingPassword=data.password;
  const hashedPassword=createHmac('sha256',salt)
                                                .update(password)
                                                .digest("hex");
  if(hashedPassword!==existingPassword){
        return res.status(400).json({
          message:'password is incorrect',
          status:"wrong Password"
        });
  }
  const payload={
      id:data.id,
      name:data.name,
      email:data.email,
      role:data.role,
  }
//  const token=jwt.sign(payload,process.env.JSON_SECRET_KEY,{expiresIn: '1m'});
 const token=jwt.sign(payload,process.env.JSON_SECRET_KEY);
 return res.json({
  token
 })
});

router.use(isAuthenticated);

router.patch("/",async(req,res,next)=>{
  const user=req.user;
  const {name}=req.body;
  await db.update(usersTable).set({name}).where(eq(usersTable.id,user.id));
//   return res.json({
//   message:'name field is updated'
// })
  req.message= `name is updated to ${name} successfully`;
  next();
},tokenGeneration);

router.get("/",async(req,res)=>{
  const user=req.user;
  console.log(user);
  
  // if(!user){
  //   return res.status(401).json({
  //     message:'you are not logged-in',
  //     status:"session Id is not provided"
  //   });
  // }
  return res.json({
    data:user
  })
})

// router.get("/",async(req,res)=>{
//   const sessionId=req.headers['session-id'];
//   if(!sessionId){
//     return res.status(401).json({
//       message:'you are not logged-in',
//       status:"session Id is not provided"
//     });
//   }
//   console.log(sessionId);
  
//   const [data]=await db.select({
//                     session_id: userSession.id,
//                     userId: userSession.userId,
//                     id: usersTable.id,
//                     name: usersTable.name,
//                     email: usersTable.email,  
//                     }).from(userSession)
//                     .where((table)=>eq(table.session_id,sessionId))
//                      .rightJoin(usersTable,eq(usersTable.id,userSession.userId))
//   console.log(data);
  
//   if(!data){
//     return res.status(401).json({
//       message:"you are not logged in"
//     })
//   }
//   return res.json({
//     data:data
//   })
// })


// --------- session based login -----------------

// router.post("/login",async (req,res)=>{
//   const {email,password}=req.body;
  
//   const [data]=await db.select({
//                                 salt:usersTable.salt,
//                                 password:usersTable.password,
//                                 email:usersTable.email,
//                                 id:usersTable.id,
//   })
//                                 .from(usersTable)
//                                 .where(table=>eq(table.email,email));
//   if(!data){
//     return res.status(400).json({
//       message:"this email is not present"  
//     })
//   }          
//   const salt=data.salt;
//   const existingPassword=data.password;
//   const hashedPassword=createHmac('sha256',salt)
//                                                 .update(password)
//                                                 .digest("hex");
//   if(hashedPassword!==existingPassword){
//         return res.status(400).json({
//           message:'password is incorrect',
//           status:"wrong Password"
//         });
//   }
//   // session of logged-in user 
//   const [session] =await db.insert(userSession)
//                           .values({
//                            userId:data.id,
//                           })  
//                           .returning({
//                             id:userSession.id,
//                           });
  
//   return res.json({
//     status:"success",
//     session:`session_id : ${session.id}`,
//   })
// });
export default router;