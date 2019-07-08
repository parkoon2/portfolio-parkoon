import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import withAuth from '../components/hoc/withAuth'

const Owner = props => {
  return (
    <BasePage>
      <h1>Owner Page</h1>
    </BasePage>
  )
}

export default withAuth('siteOwner')(Owner)
