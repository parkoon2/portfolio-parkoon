import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import { Row, Col, Button } from 'reactstrap'

import axios from 'axios'
// import Link from 'next/link'
import { Link } from '../routes'
import { getPortfolios, deletePortfolio } from '../actions/portfolio'
import { Router } from '../routes'
import PortfolioCard from '../components/portfolios/PortfolioCard'

class Portfolios extends React.Component {
  displayConfirmMessage = portfolio => {
    const isConfirm = confirm('Are you sure ?')

    if (isConfirm) {
      this.removePortfolio(portfolio)
    }
  }

  removePortfolio = async portfolio => {
    try {
      const result = await deletePortfolio(portfolio)
      Router.pushRoute('/portfolios')
    } catch (err) {
      console.error(err)
    }
  }

  renderPortfolios = portfolios => {
    const { isAuthenticated, isSiteOwner } = this.props

    return portfolios.map((portfolio, index) => (
      <Col md="4" key={index}>
        <PortfolioCard
          portfolio={portfolio}
          isAuthenticated={isAuthenticated}
          isSiteOwner={isSiteOwner}
        >
          {isAuthenticated && isSiteOwner && (
            <>
              <Button
                onClick={() => {
                  Router.pushRoute(`/portfolios/${portfolio._id}/edit`)
                }}
                color="warning"
              >
                Edit
              </Button>{' '}
              <Button
                onClick={() => {
                  this.displayConfirmMessage(portfolio)
                }}
                color="danger"
              >
                Delete
              </Button>
            </>
          )}
        </PortfolioCard>
      </Col>
    ))
  }

  render() {
    const { portfolios, isAuthenticated, isSiteOwner } = this.props

    return (
      <BaseLayout isAuthenticated={isAuthenticated}>
        <BasePage className="portfolio-page" title="Portfolios">
          {isAuthenticated && isSiteOwner && (
            <Button
              onClick={() => {
                Router.pushRoute('/portfolioNew')
              }}
              color="success"
              className="create-port-btn"
            >
              Create Portfolio
            </Button>
          )}
          <Row>{this.renderPortfolios(portfolios)}</Row>
        </BasePage>
      </BaseLayout>
    )
  }
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
