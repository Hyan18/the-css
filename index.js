const app = require('./server.js')

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})
