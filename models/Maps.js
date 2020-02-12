const mongoose = require('mongoose')
const { Schema } = mongoose

const mapsSchema = new Schema({
  name: String,
  data: Array
})

mongoose.model('maps', mapsSchema)