const mongoose = require('mongoose')
const { Schema } = mongoose

const exampleSchema = new Schema({
  name: String,
  description: String
})

mongoose.model('examples', exampleSchema)
