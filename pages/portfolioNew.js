import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'

import { Row, Col } from 'reactstrap'

import PortfolioCrateForm from '../components/portfolios/PorfolioCreateForm'

import { createPortfolio } from '../actions/portfolio'

class PortfolioNew extends React.Component {
  savePortfolio = async data => {
    try {
      // TODO 인증관련 기능 정리하고 처리
      data.userId = 'parkoon'

      const createdPortfolio = await createPortfolio(data)
      console.log('created', createdPortfolio)
    } catch (err) {
      debugger
      console.error(err)
    }
  }
  render() {
    return (
      <BaseLayout isAuthenticated={this.props.isAuthenticated}>
        <BasePage className="about-page" title="Create New Portfolio">
          <Row>
            <Col md="6">
              <PortfolioCrateForm onSubmit={this.savePortfolio} />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioNew)
