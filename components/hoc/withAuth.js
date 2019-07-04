import React from 'react'
import BasePage from '../BasePage'
export default function(Component) {
  return class withAuth extends React.Component {
    static getInitialProps = async args => {
      const pageProps =
        (await Component.getInitialProps) && Component.getInitialProps(args)
      return { ...pageProps }
    }

    renderProtectedPage = () => {
      const { isAuthenticated } = this.props
      if (isAuthenticated) {
        return <Component {...this.props} />
      } else {
        return (
          <BasePage>
            <h1>You are not authenticated. Please login to access this page</h1>
          </BasePage>
        )
      }
    }

    render() {
      return this.renderProtectedPage()
    }
  }
}
