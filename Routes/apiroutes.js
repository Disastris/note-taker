const notes = require('express').Router();

const { readFromFile, readAndAppend } = require('../Helpers/fsUtils');
const uuid = require('../Helpers/uuid')
const fs = require('fs');
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newPost = {
            title,
            text,
            id: uuid(),
        };
        readAndAppend(newPost, './db/db.json');

        const response = {
            status: 'success',
            body: newPost
        };

        res.json(response);
    }   else {
        res.json('Error in posting new post');
    }
});
notes.delete('/:id', (req, res) => {
    let db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
});


module.exports = notes;