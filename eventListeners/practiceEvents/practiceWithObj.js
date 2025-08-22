const { log } = require("console");
const EventEmiiter=require("events");
const eventEmitter=new EventEmiiter();

// multiple event trigger

eventEmitter.on("event",()=>{
    log("log ka new variant tried")
})
eventEmitter.on("event",(msg)=>{
    log(`msg wala event trigger and the message is ${msg}`)
})
eventEmitter.emit("event","mine message is clear");
eventEmitter.emit("event","2nd time trigerring the same event \n");

 // single event trigger
 eventEmitter.once("oneTrigger",()=>{
    log("triggering the event only one time")
 })
 eventEmitter.emit("oneTrigger");
log("iske baas new wale h \n \n")
 eventEmitter.emit("oneTrigger");
 eventEmitter.emit("oneTrigger");