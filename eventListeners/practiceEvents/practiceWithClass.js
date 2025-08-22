const EventEmiiter=require("events");
class Chat extends EventEmiiter{
        // constructor(){
        //     console.log("constructor smjhna h acche se");
            
        //  super();
        //   this.on("test",(msg)=>{
        //      console.log(`class message event Listener: ${msg}`);
             
        //  })
        // }
    sendMessage(msg){
        console.log(`Message is sent: ${msg}`);
        this.emit("test",msg);
    }
    listener=this.on("test",(msg)=>{
        console.log(`Listenterner Message : ${msg}`);
        
    })
    
 }
 const chat =new Chat();
//  chat.sendMessage("hello Sahil");