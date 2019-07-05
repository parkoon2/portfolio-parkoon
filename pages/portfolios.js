import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'

import axios from 'axios'
// import Link from 'next/link'
import { Link } from '../routes'

const Portfolios = props => {
  const { posts, isAuthenticated } = props

  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage className="portfolio-page" title="Portfolios">
        <Row>
          {posts.map((post, index) => (
            <Col md="4">
              <React.Fragment key={index}>
                <span>
                  <Card className="portfolio-card">
                    <CardHeader className="portfolio-card-header">
                      Some Position {index}
                    </CardHeader>
                    <CardBody>
                      <p className="portfolio-card-city">
                        {' '}
                        Some Location {index}{' '}
                      </p>
                      <CardTitle className="portfolio-card-title">
                        Some Company {index}
                      </CardTitle>
                      <CardText className="portfolio-card-text">
                        Some Description {index}
                      </CardText>
                      <div className="readMore"> </div>
                    </CardBody>
                  </Card>
                </span>
              </React.Fragment>
            </Col>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  )
}

Portfolios.getInitialProps = async () => {
  let posts = []
  try {
    let res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    posts = res.data
  } catch (err) {
    console.error(err)
  }
  return {
    posts
  }
}

export default Portfolios
