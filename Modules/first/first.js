const fs=require('fs');
// console.log(fs);
// const content=fs.readFileSync("notes.txt","utf-8");
// console.log(content);
fs.writeFileSync("notes.txt","hello world!! this is nodejs");
const content=fs.readFileSync("notes.txt","utf-8");
// console.log(content);

// fs.appendFileSync("copy.txt","this is Synchronous append in file system","utf-8");
// const contentOfCopy=fs.readFileSync("copy.txt","utf-8");
// console.log(contentOfCopy);
// fs.unlinkSync("copy.txt");
fs.mkdirSync("games/abc/a",{recursive:true});
// fs.rmdirSync("games"); this not works bcz the game folder/directory is not empty
fs.rmdirSync("games/abc/a");