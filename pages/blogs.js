import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import { Container, Row, Col } from 'reactstrap'
import { Link } from '../routes'
import moment from 'moment'
import { getBlogs } from '../actions/blog'
import { dotdotdot } from '../helpers/utils'

class Blogs extends React.Component {
  static async getInitialProps() {
    let blogs = []
    try {
      blogs = await getBlogs()
    } catch (err) {
      console.error(err)
    }

    return {
      blogs
    }
  }

  renderBlogs = blogs => {
    console.log('========= LOG START =======')
    console.log(blogs)
    console.log('========= LOG END =========')
    // author: "me"
    // createdAt: "2019-07-12T00:50:48.438Z"
    // slug: "this is slug"
    // status: "published"
    // story: "<p>this is love story!!!!!!!!!!!!~</p>"
    // subTitle: "No Sub Title"
    // title: "this is love story!!!!!!!!!!!!~"
    // updatedAt: "2019-07-12T00:50:48.438Z"
    // userId: "parkoon"
    return blogs.map((blog, index) => (
      <React.Fragment key={index}>
        <div className="post-preview">
          <Link route={`/blogs/slug/${blog.slug}`}>
            <a>
              <h2 className="post-title">{dotdotdot(blog.title)}</h2>
              <h3 className="post-subtitle">{dotdotdot(blog.subTitle)}</h3>
            </a>
          </Link>
          <p className="post-meta">
            Posted by
            <a href="#"> {blog.author} </a>
            {moment(blog.updatedAt).format('LLLL')}
          </p>
        </div>
        <hr />
      </React.Fragment>
    ))
  }
  render() {
    const { isAuthenticated, blogs } = this.props
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
            <Col md="10" lg="8" className="mx-auto">
              {this.renderBlogs(blogs)}
              <div className="clearfix">
                <a className="btn btn-primary float-right" href="#">
                  Older Posts &rarr;
                </a>
              </div>
            </Col>
          </Row>

          <footer>
            <Container>
              <Row>
                <div className="col-lg-8 col-md-10 mx-auto">
                  <ul className="list-inline text-center">
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x" />
                          <i className="fab fa-twitter fa-stack-1x fa-inverse" />
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x" />
                          <i className="fab fa-facebook-f fa-stack-1x fa-inverse" />
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x" />
                          <i className="fab fa-github fa-stack-1x fa-inverse" />
                        </span>
                      </a>
                    </li>
                  </ul>
                  <p className="copyright text-muted">
                    Copyright &copy; Filip Jerga 2018
                  </p>
                </div>
              </Row>
            </Container>
          </footer>
        </BasePage>
      </BaseLayout>
    )
  }
}

// const Blogs = props => {
//   const { isAuthenticated } = props

// }

export default Blogs
