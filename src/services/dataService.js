import axios from 'axios';

const API_URL = 'http://localhost:5021/api';
const API_KEY = 'YourSecureApiKeyHere';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': `${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

const apiClientFile = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': `${API_KEY}`,
    'Content-Type': 'multipart/form-data'
  }
});

export default {
  getAll() {
    return apiClient.get('/Products/');
  },

  get(id) {
    return apiClient.get('/Products/'+id);
  },

  create(data) {
    return apiClient.post('/Products/', data);
  },

  update(id, data) {
    return apiClient.put('/Products/'+id, data);
  },

  delete(id) {
    return apiClient.delete('/Products/'+id);
  },

  saveFile(formData) {
    return apiClientFile.post('/Files/upload', formData);
  }
};
