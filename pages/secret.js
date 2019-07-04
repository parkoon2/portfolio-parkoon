import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

class Secret extends React.Component {
  renderSecretPage = () => {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return (
        <BasePage>
          <h1>Secret Page</h1>
        </BasePage>
      )
    } else {
      return (
        <BasePage>
          <h1>You are not authenticated. Please login to access this page</h1>
        </BasePage>
      )
    }
  }

  render() {
    return this.renderSecretPage()
  }
}
export default Secret
