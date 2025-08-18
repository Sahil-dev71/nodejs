const fs=require('node:fs');

console.log("Start");
// const content=fs.readFileSync("notes.txt"); it gives you a buffer cuz there is no encoding given
//   Synchronous 
// const content=fs.readFileSync("notes.txt","utf-8")
const content=fs.readFile("notes.txt","utf-8",(error,data)=>{
    if(error) console.log(error);
    else console.log(data);
    
})
console.log(content);
console.log("ending");


