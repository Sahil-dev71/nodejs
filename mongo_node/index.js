import express from 'express';
import "dotenv/config"
import { databaseConnection } from './db.connect.js';
import userRouter from "./routes/user.routes.js";
const app=express();
app.use(express.json());
databaseConnection(process.env.MONGODB_URL)
                                        .then(()=>console.log('database is connected securely'))
const PORT=process.env.PORT??8000;
app.use("/user",userRouter);
app.listen(PORT,()=>{
    console.log(`server is running on PORT : ${PORT}`);
})