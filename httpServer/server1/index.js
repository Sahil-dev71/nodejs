const http=require("node:http");
const server=http.createServer((req,res)=>{
    // console.log(req);
    res.writeHead(200);
    console.log("server requesting the console of ur machine");
    
    res.end("hello everyOne !! :)");    
});
server.listen(port=8000,()=>{
    console.log("yeahhh !! just created a server");
})