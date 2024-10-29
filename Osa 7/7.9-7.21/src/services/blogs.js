import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  //   const request = axios.get(baseUrl);
  return axios.get(baseUrl).then((response) => response.data)
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  //   const request = axios.post(baseUrl, newObject);
  return axios
    .post(baseUrl, newObject, config)
    .then((response) => response.data)
}

const update = (id, newObject) => {
  //   const request = axios.put(`${baseUrl}/${id}`, newObject);
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios
    .delete(`${baseUrl}/${id}`, config)
    .then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  deleteBlog: deleteBlog,
  setToken,
}
