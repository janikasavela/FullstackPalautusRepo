import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  //   const request = axios.get(baseUrl);
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
  //   const request = axios.post(baseUrl, newObject);
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const update = (id, newObject) => {
  //   const request = axios.put(`${baseUrl}/${id}`, newObject);
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  delete: deletePerson,
};
