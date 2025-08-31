const express=require("express");
const library=require("./books");
const books=library.BOOKS;
const app=express();
const PORT=8000;
// this is middleware which extract the body from request and transform it and send it to body
app.use(express.json()); // Middleware

 app.listen(PORT,()=>{
    console.log(`server is running on the PORT : ${PORT}`);
 })
 app.get('/books',(req,res)=>{
    res.json(books);
 })
 // this get method is used to get the books by its id
app.get("/books/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)) res
                .status(400)
                .end("you should have to enter a number which is the id of the book");
    let book=books.find(e=>e.id===id);

    if(!book) return res
                        .status(404)
                        .end(`book of id number : ${id} is not present in database `);
    return res.json(book);
})
app.post("/books",(req,res)=>{
   const {title,author}=req.body;
   if(!title||title==="") return res
                                    .status(400)
                                    .json({"message" : "title should be provided by the user"});
   if(!author||author==="") return res
                                       .status(400)
                                       .json({"message" : "author name should be provided by the user"});
   const book={id:books.length+1,title,author};
   books.push(book); 
   console.log(req.headers);
   console.log(req.body);
   res
      .status(201)
      .json({message:"posting of book is on the way"});
})
app.delete("/books/:id",(req,res)=>{
   const id=parseInt(req.params.id);
   if(isNaN(id)) return res
                           .status(400)
                           .json({message:"must have to enter a valid id to delete the book"});
   const indexToDelete=books.findIndex(e=>e.id===id);
   books.splice(indexToDelete,1);
   return res
             .status(200)
             .json({"message" : `your request to delete book of id ${id} is successful`})
})