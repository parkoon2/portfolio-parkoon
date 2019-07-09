import axios from 'axios'

export const getPortfolios = async () => {
  try {
    return await axios.get('http://localhost:3000/api/v1/portfolios')
  } catch (err) {
    console.error(err)
  }
}
