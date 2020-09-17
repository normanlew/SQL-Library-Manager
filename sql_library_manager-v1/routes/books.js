const express = require('express');
const router = express.Router();
const Book = require('../db').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        res.status(500).send(error);
      }
    }
  }

/* Shows the full list of books */
router.get('/', asyncHandler (async (req, res) => {
    const books = await Book.findAll();
    res.render("index", {books});
}));

/* Shows the create new book form */
router.get('/new', (req, res) => {
    res.render("./books/new-book", {book: {}});
});

/* Posts a new book to the database */
router.post('/new', asyncHandler (async (req, res) => {
    let book;
    try {
        book = await Book.create(req.body);
        res.redirect("/");
    }
    catch (error) {
      if(error.name === "SequelizeValidationError") { // checking the error
        book = await Book.build(req.body);
        res.render("./books/new-book", { book, errors: error.errors})
      } else {
          throw error; // error caught in the asyncHandler's catch block
      }  
    }
    
}));

/* Shows book detail form */
router.get('/:id', asyncHandler (async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
        res.render("./books/update-book", { book }); 
    } else {
        const err = new Error("Book not found");
        next(err);
    }
}));

/* Updates book info in the database */
router.post('/:id/edit', asyncHandler (async(req, res) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        if(book) {
            await book.update(req.body);
            res.redirect("/"); 
        } else {
            res.sendStatus(404);
        }
    }
    catch (error) {
      if(error.name === "SequelizeValidationError") { // checking the error
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render("./books/update-book", { book, errors: error.errors})
      } else {
          throw error; // error caught in the asyncHandler's catch block
      }  
    }
}));

/* Delete book form. */
router.get("/:id/delete", asyncHandler (async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      res.render("./books/delete", { book });
    } else {
      res.sendStatus(404);
    }
  }));

/* Deletes a book */
router.post('/:id/delete', asyncHandler (async(req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
        await book.destroy();
        res.redirect("/books");
      } else {
        res.sendStatus(404);
      }
}));

module.exports = router;