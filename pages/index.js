import BaseLayout from '../components/layouts/BaseLayout'
import { Button } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
const Index = props => {
  return (
    <BaseLayout>
      <h1>Index Pagedd</h1>
      <Button color="danger">Danger</Button>
    </BaseLayout>
  )
}

export default Index
