import auth0 from 'auth0-js'
import Cookies from 'js-cookie'

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

  setSession = auth => {
    const expiresAt = JSON.stringify(
      auth.expiresIn * 1000 + new Date().getTime()
    )

    Cookies.set('user', auth.idTokenPayload)
    Cookies.set('jwt', auth.idToken)
    Cookies.set('expiresAt', expiresAt)
  }

  logout = () => {
    Cookies.remove('user')
    Cookies.remove('jwt')
    Cookies.remove('expiresAt')

    this.auth0.logout({
      returnTo: '',
      clientID: 'Ob9s1fta2rmml7vPXRNBq0UnFu5Y7Cgr'
    })
  }

  isAuthenticated = () => {
    const expiresAt = Cookies.getJSON('expiresAt') // 서버쪽에는 쿠키가 적용되어 있지 않다.
    // console.log(new Date().getTime()) ----------------------------- sever: number    client: number
    // console.log(expiresAt)            ----------------------------- sever: undefined client: number
    // console.log(new Date().getTime() < expiresAt) ----------------- sever: false     client: true
    console.log('expiresAt!!!!!!!!!!!!!!!!!!!!', expiresAt)
    return new Date().getTime() < expiresAt
  }

  clientAuth() {
    return this.isAuthenticated()
  }

  serverAuth(req) {
    console.log('req.headers.cookie', req.headers.cookie)
    if (req.headers.cookie) {
      const expiresAtCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('expiresAt='))

      if (!expiresAtCookie) return false

      const expiresAt = expiresAtCookie.split('=')[1]

      return new Date().getTime() < expiresAt
    }
  }

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult)
          resolve()
        } else if (err) {
          reject(err)
          console.error(err)
        }
      })
    })
  }
}

const auth0Client = new Auth()

export default auth0Client
