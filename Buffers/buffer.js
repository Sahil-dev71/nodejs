const {Buffer} =require("node:buffer"); {/* In this way we destructiong the buffer module and import only Buffer class from it */}
// const buffer=require("node:buffer"); {/* this is the way we load whole buffer module and use onuly buffer class from it */}
// const Buffer=buffer.Buffer;
const mybuff=Buffer.from("SahilGupta","utf8");
// console.log(mybuff.toString());
console.log(mybuff.slice(0,6).toString());
console.log(mybuff[0]);

const mybuff2=Buffer.alloc(8);
console.log(mybuff2);
mybuff2[1]=44;
console.log(mybuff2);
console.log(mybuff2.toString());