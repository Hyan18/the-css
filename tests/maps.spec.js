const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../server')
const request = supertest(app)
const Maps = mongoose.model('maps')

describe('maps API', () => {
  afterEach(async () => {
    await Maps.deleteMany({}, () => {})
  })

  describe('/api/maps', () => {
    it('should return an empty array if no maps', async () => {
      const response = await request.get('/api/maps')

      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })

    it('should return an array containing a map', async () => {
      Maps.create({ name: 'testMap1', data: [[0, 0], [0, 0]] })
      const response = await request.get('/api/maps')

      expect(response.status).toBe(200)
      expect(response.body.length).toEqual(1)
      expect(response.body[0].name).toEqual('testMap1')
      expect(response.body[0].data).toEqual([[0, 0], [0, 0]])
    })
  })
})
