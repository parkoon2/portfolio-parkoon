import React from 'react'
import BasePage from '../BasePage'
import BaseLayout from '../layouts/BaseLayout'

const namespace = 'http://localhost:3000/'

export default (role = false) => Component =>
  class withAuth extends React.Component {
    static getInitialProps = async args => {
      const pageProps =
        (await Component.getInitialProps) && Component.getInitialProps(args)
      return { ...pageProps }
    }

    renderProtectedPage = () => {
      const { isAuthenticated, user } = this.props

      const isOwner = role === (user && user[`${namespace}role`])

      if (!isAuthenticated) {
        return (
          <BaseLayout isAuthenticated={isAuthenticated}>
            <BasePage>
              <h1>
                You are not authenticated. Please login to access this page
              </h1>
            </BasePage>
          </BaseLayout>
        )
      }
      if (!isOwner) {
        return (
          <BaseLayout isAuthenticated={isAuthenticated}>
            <BasePage>
              <h1>
                You are authenticated. But you cannot access this page because
                you are not owner
              </h1>
            </BasePage>
          </BaseLayout>
        )
      }

      return <Component {...this.props} />
    }

    render() {
      return this.renderProtectedPage()
    }
  }
