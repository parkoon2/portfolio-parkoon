import axios from 'axios'
import uuid from 'uuid/v1'

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/v1`,
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

export const deleteBlogById = async id => {
  return axiosInstance
    .delete(`/blogs/${id}`)
    .then(res => res.data)
    .catch(err => rejectPromise(err))
}

export const getBlogs = () => {
  return axiosInstance
    .get('/blogs')
    .then(res => res.data)
    .catch(err => rejectPromise(err))
}

export const getBlogById = async id => {
  return axiosInstance
    .get(`/blogs/${id}`)
    .then(res => res.data)
    .catch(err => rejectPromise(err))
}
export const getUserBlogs = async () => {
  return axiosInstance
    .get(`/blogs/me`)
    .then(res => res.data)
    .catch(err => rejectPromise(err))
}

export const getBlogBySlug = async slug => {
  return axiosInstance
    .get(`/blogs/slug/${slug}`)
    .then(res => res.data)
    .catch(err => rejectPromise(err))
}
