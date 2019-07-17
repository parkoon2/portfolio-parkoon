import auth0 from 'auth0-js'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

const CLIENT_ID = process.env.CLIENT_ID
class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'devparkoon.auth0.com',
      clientID: CLIENT_ID,
      redirectUri: `${process.env.BASE_URL}/callback`,
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
      clientID: CLIENT_ID
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
    // return this.isAuthenticated()
    const token = Cookies.getJSON('jwt')
    const verifiedToken = this.verifyToken(token)

    return verifiedToken
  }

  verifyToken = token => {
    if (token) {
      const decodedToken = jwt.decode(token)

      if (!decodedToken) return false

      const expiresAt = decodedToken.exp * 1000
      if (decodedToken && new Date().getTime() < expiresAt) {
        return decodedToken
      } else {
        return false
      }
    }
    return false
  }

  serverAuth(req) {
    if (req.headers.cookie) {
      const jwtCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('jwt'))
      // const expiresAtCookie = req.headers.cookie
      //   .split(';')
      //   .find(c => c.trim().startsWith('expiresAt='))

      if (!jwtCookie) return false

      const token = jwtCookie.split('=')[1]
      const verifiedToken = this.verifyToken(token)

      // return new Date().getTime() < expiresAt ? decodedToken : false
      return verifiedToken
    }

    return false
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
