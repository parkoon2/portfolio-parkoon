import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button
} from 'reactstrap'

import axios from 'axios'
// import Link from 'next/link'
import { Link } from '../routes'
import { getPortfolios } from '../actions/portfolio'
import { Router } from '../routes'

const renderPortfolios = portfolios => {
  return portfolios.map((portfolio, index) => (
    <Col md="4" key={index}>
      <Card className="portfolio-card">
        <CardHeader className="portfolio-card-header" data-id={portfolio._id}>
          {portfolio.position}
        </CardHeader>
        <CardBody>
          <p className="portfolio-card-city">{portfolio.location}</p>
          <CardTitle className="portfolio-card-title">
            {portfolio.title}
          </CardTitle>
          <CardText className="portfolio-card-text">
            {portfolio.discription}
          </CardText>
          <div className="readMore">
            <Button
              onClick={() => {
                Router.pushRoute(`/portfolios/${portfolio._id}/edit`)
              }}
              color="warning"
            >
              Edit
            </Button>{' '}
            <Button color="danger">Delete</Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  ))
}

const routeToCreatePortPage = () => {
  Router.pushRoute('/portfolioNew')
}

const Portfolios = props => {
  const { portfolios, isAuthenticated } = props

  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage className="portfolio-page" title="Portfolios">
        <Button
          onClick={routeToCreatePortPage}
          color="success"
          className="create-port-btn"
        >
          Create Portfolio
        </Button>
        <Row>{renderPortfolios(portfolios)}</Row>
      </BasePage>
    </BaseLayout>
  )
}

Portfolios.getInitialProps = async () => {
  let portfolios = []
  try {
    portfolios = await getPortfolios()
  } catch (err) {
    console.error(err)
  }

  return {
    portfolios
  }
}

export default Portfolios
