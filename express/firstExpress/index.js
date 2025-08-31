const express=require("express");
const app=express();
const Port=8000;
app.get('/',(req,res)=>{
    res.end("Home Page");
})
app.get('/contactUs',(req,res)=>{
    res.status(201).end("Contact Us Here");
})
app.listen(Port,()=>{
    console.log(`server is running on Port : ${Port}`);
    
})