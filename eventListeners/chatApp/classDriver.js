const ChatRoom=require("./ChatRoom");
class chatRoom extends ChatRoom{
    constructor(){
        super();
        this.on("join",(user)=>{
            console.log(`${user} : testing the new Drive`);
        })
        this.on("sendMessage",(user,message)=>{
                console.log(`${user} : ${message}`);
        })
        this.on("leave",(user)=>{
            console.log(`${user} leave the chat`);
            
        })
        this.on("allUsers",(...users)=>{
            console.log(...users);
            
        })
    }
}
// const chat1=new chatRoom();
// chat1.sendMessage("rancho","racho is the ranchor das chanchar");
// chat1.allUsers("rancho");
// const chat2=new chatRoom();

// chat2.join("farukhh");
// chat2.join("sahrukh");
// chat2.join("amir");
// chat2.allUsers("amir");
module.exports=chatRoom;