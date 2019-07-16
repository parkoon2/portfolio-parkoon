import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import { Row, Col } from 'reactstrap'
import withAuth from '../components/hoc/withAuth'

const CV = props => {
  return (
    <BaseLayout isAuthenticated={props.isAuthenticated}>
      <BasePage title="Preview of my CV" className="cv-page">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="cv-title">
              <a
                download="jerga_cv.pdf"
                className="btn btn-success"
                href="/static/jerga_cv.pdf"
              >
                Download
              </a>
            </div>
            <iframe
              style={{ width: '100%', height: '800px' }}
              src="/static/jerga_cv.pdf"
            />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  )
}

export default CV
