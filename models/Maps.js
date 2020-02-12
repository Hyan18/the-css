const mongoose = require('mongoose')
const { Schema } = mongoose

const mapsSchema = new Schema({
  name: String,
  cells: Array
})

mongoose.model('maps', mapsSchema)
