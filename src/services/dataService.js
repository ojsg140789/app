import axios from 'axios';

const API_URL = 'http://localhost:5021/api/Products';
const API_KEY = 'YourSecureApiKeyHere';

export const getData = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'X-API-KEY': `${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};
