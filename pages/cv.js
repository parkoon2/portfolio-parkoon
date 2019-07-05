import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import withAuth from '../components/hoc/withAuth'

const CV = props => {
  return (
    <BaseLayout isAuthenticated={props.isAuthenticated}>
      <BasePage className="portfolio-create-page" title="Im about cv" />
    </BaseLayout>
  )
}

export default CV
