import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import { getBlogBySlug } from '../actions/blog'
import { Row, Col } from 'reactstrap'

const BlogDetail = props => {
  const { isAuthenticated, blog } = props

  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage className="blog-detail-page" title={blog.title}>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div dangerouslySetInnerHTML={{ __html: blog.story }} />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  )
}

BlogDetail.getInitialProps = async ({ query }) => {
  const slug = query.slug
  let blog = {}

  try {
    blog = await getBlogBySlug(slug)
  } catch (err) {
    console.error(err)
  }

  return {
    blog
  }
}

export default BlogDetail
