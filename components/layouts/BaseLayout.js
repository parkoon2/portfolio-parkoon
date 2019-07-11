import React from 'react'
import Header from '../shared/Header'

import Head from 'next/head'

const BaseLayout = props => {
  const { isAuthenticated, children } = props
  const headerType = props.headerType || 'default'
  const className = props.className || ''

  return (
    <>
      <Head>
        <script src="https://kit.fontawesome.com/788c552a2d.js" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <div className="layout-container">
        <Header
          className={`port-nav-${headerType}`}
          isAuthenticated={isAuthenticated}
        />
        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </>
  )
}

export default BaseLayout
