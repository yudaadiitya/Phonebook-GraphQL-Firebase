const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const firebase = require("firebase");
const bodyParser = require('body-parser');
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const config = {
    apiKey: "AIzaSyAYsLbLXV9_dTzH1wV8XQTnMUoJpNXffLk",
    authDomain: "rubicamp-challange.firebaseapp.com",
    databaseURL: "https://rubicamp-challange-default-rtdb.firebaseio.com",
    projectId: "rubicamp-challange",
    storageBucket: "rubicamp-challange.appspot.com",
    messagingSenderId: "1015732131612"
};
firebase.initializeApp(config);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('*', cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

const contactSchema = require('./graphql').contactSchema;
app.use('/graphql', cors(), graphqlHTTP({
    schema: contactSchema,
    rootValue: global,
    graphiql: false
}));


module.exports = app;