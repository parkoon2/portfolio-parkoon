import React from 'react'
import App, { Container } from 'next/app'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.scss'
import BaseLayout from '../components/layouts/BaseLayout'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <BaseLayout className="cover">
          <Component {...pageProps} />
        </BaseLayout>
      </Container>
    )
  }
}

export default MyApp