import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export const getTodos = async () => {
  const response = await http.get('/todos');
  return response.data;
};

export const createKeypad = async (params: { id: RequestBody['id'] }) => {
  const response = await http.post('/api/keypad', params);
  return response.data;
};

export const sendPassword = async (params: RequestBody) => {
  const response = await http.post('/api/password', params);
  return response.data;
};

export const authPassword = async (params: RequestBody) => {
  const response = await http.post('/api/password/confirm', params);
  return response.data;
};
