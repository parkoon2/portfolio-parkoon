import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import { withRouter } from 'next/router'
import axios from 'axios'
class Portfolio extends React.Component {
  render() {
    const { isAuthenticated } = this.props

    return (
      <BaseLayout isAuthenticated={isAuthenticated}>
        <BasePage>
          <h1>Portfolio Page</h1>
          <h2>{this.props.post.title}</h2>
        </BasePage>
      </BaseLayout>
    )
  }
}

Portfolio.getInitialProps = async data => {
  const { id } = data.query

  let post
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    )
    post = res.data
  } catch (err) {
    console.error(err)
  }

  return {
    post
  }
}

export default withRouter(Portfolio)
