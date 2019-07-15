import axios from 'axios'
import uuid from 'uuid/v1'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 3 * 1000
})

const rejectPromise = resError => {
  let error = {}

  if (resError && resError.response && resError.response.data) {
    error = resError.response.data
  } else {
    error = resError
  }

  return Promise.reject(error)
}

export const saveBlog = async blog => {
  return await axiosInstance
    .post(`/blogs?lockId=${uuid()}`, blog)
    .then(res => res.data)
    .catch(err => rejectPromise(err))
}

export const updateBlogById = async (id, blog) => {
  return axiosInstance
    .patch(`/blogs/${id}`, blog)
    .then(res => res.data)
    .catch(err => rejectPromise(err))
}

export const getBlogById = async id => {
  return axiosInstance
    .get(`/blogs/${id}`)
    .then(res => res.data)
    .catch(err => rejectPromise(err))
}
