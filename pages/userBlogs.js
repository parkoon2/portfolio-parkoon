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
      console.log('여기?')
      blogs = await getUserBlogs()
    } catch (err) {
      console.error(err)
    }

    return {
      blogs
    }
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
            <Col md="6" className="mx-auto text-center">
              ABC
            </Col>
            <Col md="6" className="mx-auto text-center">
              EFG
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
