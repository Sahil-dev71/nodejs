import mongoose from "mongoose";

export const databaseConnection=async(connectionURL)=>{
    const connect=await mongoose.connect(connectionURL);
    return connect;
}