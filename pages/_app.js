import React from 'react'
import App, { Container } from 'next/app'
import { ToastContainer, toast } from 'react-toastify'
import auth0 from '../services/auth0'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.scss'
import 'react-toastify/dist/ReactToastify.css'

const namespace = 'http://localhost:3000'

// 서버에서도 가장 먼저 실행되는 곳! 클라이언트에서도 가장 먼저 실행되는 곳!
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    console.log('call every time..?', process.browser)

    const user = process.browser
      ? auth0.clientAuth()
      : auth0.serverAuth(ctx.req)

    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(ctx)
        console.log('pageProps', pageProps)
      } catch (err) {
        console.log(err)
      }
    }

    const isSiteOwner = user[`${namespace}/role`] === 'siteOwner'
    let auth = { user, isAuthenticated: !!user, isSiteOwner }

    return { pageProps, auth }
  }

  componentDidMount() {
    console.log('????render')
  }

  render() {
    const { Component, pageProps, auth } = this.props
    return (
      <Container>
        <Component {...pageProps} {...auth} />
        <ToastContainer />
      </Container>
    )
  }
}

export default MyApp
