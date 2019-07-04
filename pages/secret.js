import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import withAuth from '../components/hoc/withAuth'

class Secret extends React.Component {
  static getInitialProps = () => {
    const foo = 'bar'
    return {
      foo
    }
  }

  render() {
    console.log(this.props)
    return (
      <BasePage>
        <h1>Secret Page</h1>
        <span>{this.props.foo}</span>
      </BasePage>
    )
  }
}
export default withAuth(Secret)
