import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import { Container, Row, Col } from 'reactstrap'
import { Link, Router } from '../routes'
import moment from 'moment'
import { getUserBlogs, updateBlogById, deleteBlogById } from '../actions/blog'
import DropDownButton from '../components/DropDownButton'

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
    blogs.forEach(blog => {
      blog.status === 'draft' ? draft.push(blog) : published.push(blog)
    })

    return {
      draft,
      published
    }
  }

  updateBlogStatus = async (id, status) => {
    try {
      const res = await updateBlogById(id, { status })
      Router.pushRoute(`/userBlogs`)
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }

  deleteBlog = async id => {
    const isConfirm = confirm('Are you sure ?')
    if (isConfirm) {
      try {
        const res = await deleteBlogById(id)
        Router.pushRoute('/userBlogs')
      } catch (err) {
        console.error(err)
      }
    }
  }

  createStatus = status => {
    return status === 'draft'
      ? { view: 'Publish Story', value: 'published' }
      : { view: 'Make a draft', value: 'draft' }
  }

  dropdownOptions = blog => {
    const status = this.createStatus(blog.status)

    return [
      {
        text: status.view,
        handlers: {
          onClick: () => this.updateBlogStatus(blog._id, status.value)
        }
      },
      {
        text: 'Delete',
        handlers: { onClick: () => this.deleteBlog(blog._id) }
      }
    ]
  }

  renderBlogs = blogs => {
    return (
      <ul className="user-blogs-list">
        {blogs.map((blog, index) => (
          <li key={index}>
            <Link href={`/blogs/${blog._id}/edit`}>
              <a>{blog.title}</a>
            </Link>
            <DropDownButton items={this.dropdownOptions(blog)} />
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
