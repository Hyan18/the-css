const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../server')
const request = supertest(app)

describe('maps API', () => {
  describe('/api/maps', () => {
    it('should return an empty array if no maps', async () => {
      const response = await request.get('/api/maps')

      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })
  })
})
