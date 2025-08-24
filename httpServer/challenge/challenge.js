const http = require("node:http");
const db = require("node:fs");

const server = http.createServer((req, res) => {
  // console.log(typeof req.headers);
  // res.writeHead(200);
  //  const header=JSON.stringify(req.headers["host"]);
  //     res.end(header);
  let writeInDatabase=false;
  let body = "";
  req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end",()=>{
        // console.log(typeof body);
        // console.log(body);
        if(writeInDatabase){bodyCheck(body)}
        writeInDatabase=false;
    })
    // --------------- File System --------------------
    
    function write(data) {
        db.appendFileSync("database.txt", `${data}\n`);
        return "work is done";
    }
    function bodyCheck(body) {
        console.log(typeof body);
        console.log(body);
        if(body){
            write(body);
        }else{
            return "bruhh body is empty ";
        }
    }
    
    let method = req.method;
    let path = req.url;
    const log=`method : "${method}" path : "${path}" time : "${Date.now()}"\n`;
    db.appendFileSync("log.txt",log)
  switch (method) {
    case "GET":
      switch (path) {
        case "/":
          res.writeHead(200);
          res.end("hello sir, any feedback sirr!");
          break;
        case "/contactUs":
          res.writeHead(200);
          res.end(
            "here is my email if you want to contact me : 'guptasahil9856@GamepadHapticActuator.com'"
          );
          break;
        case "/tweet":
          res.writeHead(200);
          res.end("tweet1 \n tweet2");
          break;
      }
      break;
    case "POST":
      switch (path) {
        case "/tweet":
          writeInDatabase=true;
          res.writeHead(201);
          res.end("Your tweet is uploaded to database");
      }
      break;
  }
});
server.listen(8000, () => {
  console.log("this server is running on PORT : 8000");
});
