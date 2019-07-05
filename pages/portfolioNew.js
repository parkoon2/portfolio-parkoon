import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'

import PortfolioCrateForm from '../components/portfolios/PorfolioCreateForm'

const PortfolioNew = props => {
  return (
    <BaseLayout isAuthenticated={props.isAuthenticated}>
      <BasePage className="about-page" title="Im about page">
        <PortfolioCrateForm />
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth('siteOwner')(PortfolioNew)
