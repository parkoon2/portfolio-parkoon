import React from 'react'
import Header from '../shared/Header'

const BaseLayout = props => {
  return (
    <>
      <div className="layout-container">
        <Header auth={props.auth} />
        <main className={`cover ${props.className}`}>
          <div className="wrapper">{props.children}</div>
        </main>
      </div>
    </>
  )
}

export default BaseLayout
