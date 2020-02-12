const mongoose = require('mongoose')
const Maps = mongoose.model('maps')

module.exports = (app) => {
  app.get('/api/maps', async (req, res) => {
    const maps = await Maps.find()

    return res.status(200).send(maps)
  })

  app.post('/api/maps', async (req, res) => {
    let map = await Maps.create(req.body)

    return res.status(201).send({
      error: false,
      map: map
    })
  })
}
