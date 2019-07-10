import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'

import { Row, Col } from 'reactstrap'

import PortfolioCrateForm from '../components/portfolios/PorfolioCreateForm'

import {
  createPortfolio,
  getPortfolioById,
  updatePortfolio
} from '../actions/portfolio'

import { Router } from '../routes'

class PortfolioUpdate extends React.Component {
  static async getInitialProps({ query }) {
    const portfolioId = query.id
    let portfolio = {}

    try {
      portfolio = await getPortfolioById(portfolioId)
    } catch (err) {
      console.error(err)
    }

    return {
      portfolio
    }
  }
  editPortfolio = async data => {
    try {
      // TODO 인증관련 기능 정리하고 처리

      console.log('========= LOG START =======')
      console.log('data', data)
      console.log('========= LOG END =========')

      data.userId = 'parkoon'
      const createdPortfolio = await updatePortfolio(data)
      Router.pushRoute('/portfolios')
    } catch (err) {
      console.log('----- error -----')
      console.error(err)
    }
  }
  render() {
    return (
      <BaseLayout isAuthenticated={this.props.isAuthenticated}>
        <BasePage className="about-page" title="Update Portfolio">
          <Row>
            <Col md="6">
              <PortfolioCrateForm
                initialValue={this.props.portfolio}
                onSubmit={this.editPortfolio}
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioUpdate)
