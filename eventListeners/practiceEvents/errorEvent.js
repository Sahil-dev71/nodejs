const EventEmiiter=require("events");
const error=new EventEmiiter();
error.on("error",(err)=>{
  console.error(`This is the mine Error :: ${err}`);
})
error.emit("error",new Error("learning the concepts of handling error via error event"));