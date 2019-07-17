const prod = process.env.NODE_ENV === 'production'
module.exports = {
  'process.env.BASE_URL': prod
    ? 'https://parkoon.herokuapp.com'
    : 'http://localhost:3000',
  'process.env.NAMESPACE': 'https://parkoon.herokuapp.com',
  'process.env.CLIENT_ID': 'Ob9s1fta2rmml7vPXRNBq0UnFu5Y7Cgr'
}
