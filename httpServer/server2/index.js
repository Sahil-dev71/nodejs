const http = require("node:http");
const server2 = http.createServer((req, res) => {
//   console.log(req.headers);
  // res.writeHead(200);
  console.log(req.method);
  // console.log(req);
  let body="";
  req.on("data",(chunk)=>{
    body +=chunk.toString();
  })
  req.on("end",()=>{
    console.log(`${body}}`);
    
  })
  switch (req.url) {
    case "/":
      res.writeHead(200);
      return res.end("HOME page bro");
    case "/contactUs":
      res.writeHead(200);
      return res.end("Contact Us Broh Here");
    case "/aboutUs":
      res.writeHead(200);
      return res.end("know about us bro Here");
    default:
      res.writeHead(404);
      return res.end("You are Lost Brohhh");
  }
  // res.end(`supported languages are ${req.headers['accept-language']}`);
  // res.end("nice to meet you LLl");
});
server2.listen(8000, () => {
  console.log("this server runs on the PORT : 8000");
});
