import axios from 'axios'

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
    .post('/blogs', blog)
    .then(res => res.data)
    .catch(err => rejectPromise(err))
}
