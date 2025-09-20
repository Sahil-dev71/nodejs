const { eq, ilike } = require("drizzle-orm");
const booksTable=require("../models/book.model");
const authorsTable=require("../models/author.module");
const db  = require("../db");
const {sql}=require("drizzle-orm")
exports.getAllBooks = async function (req, res) {
  const search=req.query.search;
  console.log(search);
  
  // if(search){
  //   const book=await db.select().from(booksTable).where(ilike(booksTable.title,`%${search}%`))
  //   return res.json(book);
  // }
  if(search){
    const book=await db.select().from(booksTable).where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`);
    return res.json(book);
  }
  const books = await db.select().from(booksTable);
  // return books;
  return res.json(books);
};
exports.getBookById = async function (req, res) {
  const id = req.params.id;
  // if (isNaN(id))
  //   return res
  //     .status(400)
  //     .end("you should have to enter a number which is the id of the book");
  // let book = db.find((e) => e.id === id);
  let [book] =await db
                       .select().from(booksTable)
                       .where((table)=>eq(table.id,id))
                       .leftJoin(authorsTable,eq(booksTable.authorId,authorsTable.id));
  //

  if (!book)
    return res
      .status(404)
      .end(`book of id number : ${id} is not present in database `);
  return res.json(book);
};
exports.createBook = async function (req, res) {
  const { title, description, authorId } = req.body;
  if (!title || title === "")
    return res
      .status(400)
      .json({ message: "title should be provided by the user" });
  // if (!author || author === "")
  //   return res
  //     .status(400)
  //     .json({ message: "author name should be provided by the user" });
  const [result] = await db.insert(booksTable)
    .values({
      title,
      description,
      authorId,
    })
    .returning({
      id: booksTable.id,
    });
  return res.status(201).json({ message: `your books id : ${result.id}` });
};
exports.deleteBookById = async function (req, res) {
  const id = req.params.id;
  // if (isNaN(id))
  //   return res
  //     .status(400)
  //     .json({ message: "must have to enter a valid id to delete the book" });
  const deletedBook = await db.delete(booksTable)
    .where(eq(booksTable.id, id));
  // db.splice(indexToDelete, 1);
  return res
    .status(200)
    .json({
      message: `your request to delete book of id ${deletedBook.id} is successful`,
    });
};
