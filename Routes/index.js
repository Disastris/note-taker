const express = require('express');
const app = express();

const notesRouter = require('./apiroutes');

app.use('/notes', notesRouter);


module.exports = app;