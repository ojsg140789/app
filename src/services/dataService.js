import axios from 'axios';

const API_URL = 'http://localhost:5021/api/Products';
const API_KEY = 'YourSecureApiKeyHere';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': `${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export default {
  getAll() {
    return apiClient.get('/');
  },

  get(id) {
    return apiClient.get('/'+id);
  },

  create(data) {
    return apiClient.post('/', data);
  },

  update(id, data) {
    return apiClient.put('/'+id, data);
  },

  delete(id) {
    return apiClient.delete('/'+id);
  }
};
