import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const api = axios.create({ baseURL: BASE_URL });

export const getBouquets = async ({ page = 1, limit = 8 } = {}) => {
  const { data } = await api.get('/bouquets', { params: { _page: page, _per_page: limit } });
  return data;
};

export const getBestsellers = async () => {
  const { data } = await api.get('/bestsellers');
  return data;
};

export const submitOrder = async (order) => {
  const { data } = await api.post('/orders', order);
  return data;
};
