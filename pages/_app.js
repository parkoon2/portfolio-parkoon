import React from 'react'
import App, { Container } from 'next/app'

import auth0 from '../services/auth0'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.scss'
import BaseLayout from '../components/layouts/BaseLayout'

// 서버에서도 가장 먼저 실행되는 곳! 클라이언트에서도 가장 먼저 실행되는 곳!
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    const isAuthenticated = process.browser
      ? auth0.clientAuth()
      : auth0.serverAuth(ctx.req)

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    let auth = { isAuthenticated }

    return { pageProps, auth }
  }

  render() {
    const { Component, pageProps, auth } = this.props

    return (
      <Container>
        <BaseLayout className="cover" auth={auth}>
          <Component {...pageProps} />
        </BaseLayout>
      </Container>
    )
  }
}

export default MyApp
