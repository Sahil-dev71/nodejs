const express=require("express");
const router=express.Router();
const authorsTable=require("../models/author.module");
const booksTable=require("../models/book.model");
const db=require("../db");
const { eq, sql } = require("drizzle-orm");
router.get('/',async (req,res)=>{
    const authors=await db.select().from(authorsTable);
    if(!authors){
        return res.json({error:"There is no author present in database"});
    }
    return res.json(authors);
});
router.get("/:id",async(req,res)=>{
    const author=await db.select().from(authorsTable).where(eq(req.params.id,authorsTable.id));
    if(!author){
        return res.json({error:`author with id : ${req.params.id} is not present in database`});
    }
    return res.json(author);
});
router.post("/",async(req,res)=>{
    const {firstName,lastName,email}=req.body;
    const [result]=await db.insert(authorsTable)
    .values({
        firstName,
        lastName,
        email
    })
    .returning({
        id:authorsTable.id,
    });
    return res.status(201).json({
        message:`your authors id of author ${firstName} is ${result.id}`
    })
});
router.delete("/:id",async(req,res)=>{
    await db.delete(booksTable).where(eq(booksTable.authorId,req.params.id))
    await db.delete(authorsTable).where(eq(authorsTable.id,req.params.id))
    return res.status(200).json({
        message:"your author is deleted successfully"
    })
});
router.get("/:id/books",async(req,res)=>{
    const books=await db.select().
    from(booksTable)
    .where(
        eq(booksTable.authorId,req.params.id
        )).leftJoin(authorsTable,eq(req.params.id,authorsTable.id))
    return res.json(books);
})
module.exports=router;