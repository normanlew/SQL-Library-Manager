const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* Shows the full list of books */
router.get('/', (req, res) => {
    // console.log('test');
    // const books = Book.findAll();
    // console.log(books);
    res.render("books/index");
    // console.log('Shows the full list of books');
});

/* Shows the create new book form */
router.get('/new', (req, res) => {
    console.log('Shows the create new book form');
});

/* Posts a new book to the database */
router.post('/new', (req, res) => {
    console.log('Posts a new book to the database');
});

/* Shows book detail form */
router.get('/:id', (req, res) => {
    console.log('Shows book detail form');
});

/* Updates book info in the database */
router.post('/:id', (req, res) => {
    console.log('Updates book info in the database');
});

/* Deletes a book */
router.post('/:id/delete', (req, res) => {
    console.log('Deletes a book');
});

module.exports = router;