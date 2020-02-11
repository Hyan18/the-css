const mongoose = require('mongoose')
const Example = mongoose.model('examples')

module.exports = (app) => {
  app.get('/api/example', async (req, res) => {
    const examples = await Example.find()
    return res.status(200).send(examples)
  })
}
