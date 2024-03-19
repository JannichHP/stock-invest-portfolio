// api.js
import axios from 'axios';

const api = axios.create();

const getStockData = async (symbol, apiKey, baseUrl) => {
  try {
    const response = await api.get(`/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`, {
      baseURL: baseUrl
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export { getStockData };