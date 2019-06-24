import BaseLayout from '../components/layouts/BaseLayout'
import { withRouter } from 'next/router'
const Portfolio = props => {
  debugger
  return (
    <BaseLayout>
      <h1>Portfolio Page</h1>
      <h2>{props.router.query.title}</h2>
    </BaseLayout>
  )
}

export default withRouter(Portfolio)
