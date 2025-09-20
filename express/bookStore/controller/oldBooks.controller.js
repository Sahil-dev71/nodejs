const {BOOKS} =require("../db");
exports.getAllBooks=function(req, res){
  res.json(BOOKS);
};
exports.getBookById=function(req, res){
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res
      .status(400)
      .end("you should have to enter a number which is the id of the book");
  // let book = BOOKS.find((e) => e.id === id);
  let book = BOOKS.find((e) => e.title ==id);
// 

  if (!book)
    return res
      .status(404)
      .end(`book of id number : ${id} is not present in database `);
  return res.json(book);
}
exports.createBook=function (req, res){
  const { title, author } = req.body;
  if (!title || title === "")
    return res
      .status(400)
      .json({ message: "title should be provided by the user" });
  if (!author || author === "")
    return res
      .status(400)
      .json({ message: "author name should be provided by the user" });
  const book = { id: BOOKS.length + 1, title, author };
  BOOKS.push(book);
  console.log(req.headers);
  console.log(req.body);
  return res.status(201).json({ message: "posting of book is on the way" });
}
exports.deleteBookById=function(req, res){
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res
      .status(400)
      .json({ message: "must have to enter a valid id to delete the book" });
  const indexToDelete = BOOKS.findIndex((e) => e.id === id);
  BOOKS.splice(indexToDelete, 1);
  return res
    .status(200)
    .json({ message: `your request to delete book of id ${id} is successful` });
}