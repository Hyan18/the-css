const mongoose = require('mongoose')
const Maps = mongoose.model('maps')

module.exports = (app) => {
  app.get('/api/maps', async (req, res) => {
    const maps = await Maps.find()

    return res.status(200).send(maps)
  })
}
