import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import { Container, Row, Col } from 'reactstrap'
import { Link } from '../routes'
import moment from 'moment'
import { getUserBlogs } from '../actions/blog'

class Blogs extends React.Component {
  static async getInitialProps() {
    let blogs = []
    try {
      blogs = await getUserBlogs()
    } catch (err) {
      console.error(err)
    }

    return {
      blogs
    }
  }

  separateBlogs = blogs => {
    let draft = []
    let published = []
    console.log(blogs)
    blogs.forEach(blog => {
      blog.status === 'draft' ? draft.push(blog) : published.push(blog)
    })

    return {
      draft,
      published
    }
  }

  renderBlogs = blogs => {
    return (
      <ul className="user-blogs-list">
        {blogs.map(blog => (
          <li>
            <Link href={`/blogs/${blog._id}/edit`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const { isAuthenticated, blogs } = this.props

    const { draft, published } = this.separateBlogs(blogs)

    return (
      <BaseLayout
        isAuthenticated={isAuthenticated}
        headerType={'landing'}
        className="blog-listing-page"
      >
        <div
          className="masthead"
          style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
        >
          <div className="overlay" />
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Fresh Blogs</h1>
                  <span className="subheading">Programming, travelling...</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-body">
          <Row>
            <Col md="6" className="mx-auto text-center">
              <h1 className="blog-status-title">Published Blogs</h1>
              {this.renderBlogs(published)}
            </Col>
            <Col md="6" className="mx-auto text-center">
              <h1 className="blog-status-title">Draft</h1>
              {this.renderBlogs(draft)}
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

// const Blogs = props => {
//   const { isAuthenticated } = props

// }

export default Blogs
