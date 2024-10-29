import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/users';

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

export default {
  getAll,
};
