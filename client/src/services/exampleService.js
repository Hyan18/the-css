import axios from 'axios'

export default {
  getAll: async () => {
    const res = await axios.get('/api/example')
    return res.data || []
  }
}
