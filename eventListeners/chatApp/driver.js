// import chatRoom from "./ChatRoom.js";  {/* Only applicable for EJS module for that set "type":"module" in package.json file */}
const chatRoom=require("./ChatRoom")
const chat=new chatRoom();
chat.on("join",(user)=>{
    console.log(`${user} joined the chat.`);
})
chat.on("sendMessage",(user,message)=>{
    console.log(`${user} : ${message}`);
})
chat.on("leave",(user)=>{
    console.log(`${user} left the chat`);
})
chat.on("allUsers",(...users)=>{
        // console.log(users);
    //    users.forEach(user=>{
    //     console.log(user);
    //    })
    console.log(...users);
    
})
chat.join('sahil');
chat.join("deepu");
chat.join("akash");
chat.sendMessage("sahil","hello everyone !!");
// chat.leave("sahil");
// chat.sendMessage("sahil","I am back babyy")
chat.allUsers("akash");