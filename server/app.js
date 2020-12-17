const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect Mongoose
mongoose.connect('mongodb://localhost/phonebookdb', {
    useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connection succes');
});

//const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
const phonebookRouter = require('./routes/phonebook');

const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api/phonebooks', phonebookRouter);

module.exports = app;
