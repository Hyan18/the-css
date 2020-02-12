module.exports = (app) => {
  app.get('/api/maps', async (req, res) => {
    return res.status(200).send([])
  })
}
