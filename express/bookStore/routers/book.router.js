const express=require('express');
const router=express.Router();
const {routeMiddleware}=require("../middleware/storesMiddleware");
const controller=require("../controller/books.controller");


router.get("/",controller.getAllBooks );

// this get method is used to get the books by its id
router.get("/:id",routeMiddleware, controller.getBookById);

router.post("/",controller.createBook);

router.delete("/:id", controller.deleteBookById);

module.exports=router;