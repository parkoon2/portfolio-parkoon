import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'

import { Row, Col } from 'reactstrap'

import PortfolioCrateForm from '../components/portfolios/PorfolioCreateForm'

import { createPortfolio } from '../actions/portfolio'

import { Router } from '../routes'

const initialValue = {
  title: '',
  company: '',
  location: '',
  position: '',
  description: '',
  startDate: '',
  endDate: ''
}

class PortfolioNew extends React.Component {
  savePortfolio = async data => {
    try {
      // TODO 인증관련 기능 정리하고 처리
      data.userId = 'parkoon'
      const createdPortfolio = await createPortfolio(data)
      Router.pushRoute('/portfolios')
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    return (
      <BaseLayout isAuthenticated={this.props.isAuthenticated}>
        <BasePage className="about-page" title="Create New Portfolio">
          <Row>
            <Col md="6">
              <PortfolioCrateForm
                initialValue={initialValue}
                onSubmit={this.savePortfolio}
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioNew)
