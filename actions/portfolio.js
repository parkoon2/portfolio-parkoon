import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 3 * 1000
})

export const getPortfolios = async () => {
  return await axiosInstance.get('/portfolios').then(res => res.data)
}

export const createPortfolio = async portfolioData => {
  return await axiosInstance
    .post('/portfolios', portfolioData)
    .then(res => res.data)
}
