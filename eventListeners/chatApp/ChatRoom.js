const ChatRoom=require("events");
// import EventEmitter from "events"; {/* Only applicable for EJS module for that set "type":"module" in package.json file */} 
// const ChatRoom=EventEmitter;
class chatRoom extends ChatRoom{
    constructor(){
        super();
        this.users=new Set();
    }
    allUsers(user){
        let validUser=(typeof user==="undefined");
        if(this.users.has(user) && !validUser){
            this.emit("allUsers",...(this.users));
        }else if(validUser){
            console.log("you should have to enter your username");
        }
        else{
            console.log(`${user}: you are not in the chat`);
            
        }
    }
    join(user){
        if(this.users.has(user)){
            console.log(`${user} is already present`);
        }else{
            this.emit("join",user);
            this.users.add(user);
        }
    }
    sendMessage(user,message){
        if(this.users.has(user)){
            this.emit("sendMessage",user,message);
        }else{
            console.log(`${user} is not in the chat`);
        }
    }
    leave(user){
        if(this.users.has(user)){
            this.users.delete(user);
            this.emit("leave",user)
        }else{
            console.log(`${user} is not in the chat yet`);
        }
    }
}
module.exports=chatRoom;
// export default chatRoom;