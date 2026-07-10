import axios from 'axios';

const BASE_URL = 'https://umt-markup-practice-p2-toma-denys.onrender.com/';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getBouquets = async ({ page = 1, limit = 8 } = {}) => {
  const response = await api.get('/bouquets', {
    params: {
      _page: page,
      _limit: limit,
    },
  });

  const body = response.data;

  if (Array.isArray(body)) {
    const totalCount = Number(response.headers?.['x-total-count']);
    const items = Number.isFinite(totalCount) ? totalCount : body.length;
    const pages = Math.max(1, Math.ceil(items / limit));

    return {
      data: body,
      next: page < pages ? page + 1 : null,
      prev: page > 1 ? page - 1 : null,
      pages,
      items,
    };
  }

  return {
    data: body.data ?? [],
    next: body.next ?? null,
    prev: body.prev ?? null,
    pages: body.pages ?? 1,
    items: body.items ?? (body.data ? body.data.length : 0),
  };
};

export const getBestsellers = async () => {
  const { data } = await api.get('/bestsellers');
  return data;
};

export const submitOrder = async (order) => {
  const { data } = await api.post('/orders', order);
  return data;
};