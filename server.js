const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// import models
require('./models/ExampleThing')
require('./models/Maps')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/the-css', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(bodyParser.json())

// import routes
require('./routes/exampleRoutes')(app)
require('./routes/mapsRoutes')(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

module.exports = app
