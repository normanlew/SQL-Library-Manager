const db = require('./db');
const Book = db.Book;

const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

const routes = require('./routes/index');
const books = require('./routes/books');

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/static', express.static('public'));

app.use('/', routes);
app.use('/books', books);   

(async () => {

    await db.sequelize.sync({ force: true });

    const book = await Book.create({
        title: 'Software Engineering',
        author: 'Jill Smith',
        genre: 'Information Technology',
        year: 2017,
    });

    const book2 = await Book.create({
        title: 'Trees',
        author: 'Norman Lew',
        genre: 'Nature',
        year: 2019,
    });

})();

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    next(createError(404));
});
  
// error handler
app.use( (err, req, res, next) => {
    if (err.status === 404) {
        res.render('./books/page-not-found');
    }
    else {
        res.status(err.status || 500);
        res.render('./books/server-error', {
          message: err.message,
          error: err
        });
    }
});

app.listen(3000, () => {
    console.log('Program running')
});

