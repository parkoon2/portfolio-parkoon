import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'

import { Row, Col } from 'reactstrap'

import PortfolioCrateForm from '../components/portfolios/PorfolioCreateForm'

class PortfolioNew extends React.Component {
  onSavePortfolio = data => {
    alert(JSON.stringify(data, null, 2))
  }
  render() {
    return (
      <BaseLayout isAuthenticated={this.props.isAuthenticated}>
        <BasePage className="about-page" title="Create New Portfolio">
          <Row>
            <Col md="6">
              <PortfolioCrateForm onSubmit={this.onSavePortfolio} />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioNew)
