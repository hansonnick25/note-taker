const notes = require('express').Router()
const { uuid } = require('uuidv4')

const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require('../helpers/fsUtil')

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then(data => res.json(JSON.parse(data)))
})

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body)

  const { title, text } = req.body

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    }

    readAndAppend(newNote, './db/db.json')
    res.json(`Note added successfully: ${newNote.title}`)
  } else {
    res.error(`Error in adding note: ${err}`)
  }
})

// DELETE Route for a specific note
notes.delete('/:note_id', (req, res) => {
  const noteId = req.params.note_id
  readFromFile('./db/db.json')
    .then(data => JSON.parse(data))
    .then(json => {
      // Filter out note with specified uuid
      const result = json.filter(note => note.note_id == noteId)

      // Save that array to the filesystem
      writeToFile('./db/db.json', result)

      res.json(`Item ${noteId} has been deleted 🗑️`)
    })
})

module.exports = notes
