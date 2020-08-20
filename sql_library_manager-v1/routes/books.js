const express = require('express');
const router = express.Router();
// const Book = require('../models/book').Book; 
// const Book = require('../db/models/book.js')(sequelize);
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
    // // console.log('test');
    const books = await Book.findAll();
    // console.log(books);
    res.render("index", {books});
    // console.log('Shows the full list of books');
}));

/* Shows the create new book form */
router.get('/new', (req, res) => {
    // console.log('Shows the create new book form');
    res.render("./books/new-book", {book: {}});
});

/* Posts a new book to the database */
router.post('/new', asyncHandler (async (req, res) => {
    // console.log(req.body);
    const book = await Book.create(req.body);
    // const book2 = await Book.findByPk(1);
    // console.log(book2);
    console.log('Posts a new book to the database');
    res.redirect("/");
}));

/* Shows book detail form */
router.get('/:id', asyncHandler (async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    // console.log(book);
    if(book) {
        res.render("./books/update-book", { book }); 
    } else {
        const err = new Error("Book not found");
        console.log(err.message);
        next(err);
    }
}));

/* Updates book info in the database */
router.post('/:id', asyncHandler (async(req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.update(req.body);
        res.redirect("/");
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