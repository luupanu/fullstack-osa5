import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const update = async (id, blogObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogObject)
  return response.data
}

export default { setToken, getAll, create, remove, update }