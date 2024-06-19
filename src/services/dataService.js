import axios from 'axios';

const API_URL = 'http://localhost:5021/api/Products';
const API_KEY = 'YourSecureApiKeyHere';

export default {
  getAll() {
    return axios.get(`${API_URL}`,{
      headers: {
        'X-API-KEY': `${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  },

  get(id) {
    return axios.get(`${API_URL}/${id}`,{
      headers: {
        'X-API-KEY': `${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  },

  create(data) {
    return axios.post(`${API_URL}`,{
      headers: {
        'X-API-KEY': `${API_KEY}`,
        'Content-Type': 'application/json'
      }
    }, data);
  },

  update(id, data) {
    return axios.put(`${API_URL}/${id}`,{
      headers: {
        'X-API-KEY': `${API_KEY}`,
        'Content-Type': 'application/json'
      }
    }, data);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`,{
      headers: {
        'X-API-KEY': `${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  }
};
