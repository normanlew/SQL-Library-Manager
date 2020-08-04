const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'library.db',
  });

const express = require('express');
const path = require('path');
const app = express();

const routes = require('./routes/index');
const books = require('./routes/books');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'));

app.use('/', routes);
app.use('/books', books);

const Book = require('./models/book.js')(sequelize);

(async () => {
await sequelize.sync({ force: true });

const book = await Book.create({
    title: 'Software Engineering',
    author: 'Jill Smith',
    genre: 'Information Technology',
    year: 2017,
});

console.log(book.toJSON());

const book2 = await Book.create({
    title: 'Trees',
    author: 'Norman Lew',
    genre: 'Nature',
    year: 2019,
});

console.log(book2.toJSON());
})();

app.listen(3000, () => {
    console.log('Programming running')
});

