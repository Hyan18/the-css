const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../server')
const request = supertest(app)

describe('Server', () => {
  describe('/example', () => {
    it('gets a json of the examples', async (done) => {
      const response = await request.get('/api/example')

      expect(response.status).toBe(200)
      console.log(response.body)
      done()
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
