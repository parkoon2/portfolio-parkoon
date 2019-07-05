import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

const Blogs = props => {
  const { isAuthenticated } = props

  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage>
        <h1>Blog Page</h1>
      </BasePage>
    </BaseLayout>
  )
}

export default Blogs
