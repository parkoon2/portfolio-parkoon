import auth0 from 'auth0-js'

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'devparkoon.auth0.com',
      clientID: 'Ob9s1fta2rmml7vPXRNBq0UnFu5Y7Cgr',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    })
  }

  login = () => {
    console.log('login!?')
    this.auth0.authorize()
  }
}

const auth0Client = new Auth()

export default auth0Client
