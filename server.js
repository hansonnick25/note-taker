// Declarations and Imports
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const api = require('./routes/index.js')
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', api)
app.use(express.static('public'))

// Listener
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
