const express = require("express");
require("dotenv/config");

const {customMiddleware,routeSpecificMiddleware}=require("./middleware/storesMiddleware");
const bookRouter=require("./routers/book.router");
const authorRouter=require("./routers/authors.router");

const app = express();
const PORT = 8000;
// this is middleware which extract the body from request and transform it and send it to body
app.use(express.json()); // Middleware

app.use("/:id",routeSpecificMiddleware);
app.use(customMiddleware); // global middleware
app.use("/authors",authorRouter);
app.use("/books",bookRouter);

app.listen(PORT, () => {
  console.log(`server is running on the PORT : ${PORT}`);
});

