const express = require("express");

const {customMiddleware,routeSpecificMiddleware}=require("./middleware/storesMiddleware");
const bookRouter=require("./routers/book.router");

const app = express();
const PORT = 8000;
// this is middleware which extract the body from request and transform it and send it to body
app.use(express.json()); // Middleware

app.use("/:id",routeSpecificMiddleware);
app.use(customMiddleware); // global middleware

app.use("/books",bookRouter);

app.listen(PORT, () => {
  console.log(`server is running on the PORT : ${PORT}`);
});

