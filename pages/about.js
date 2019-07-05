import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

const About = props => {
  const { isAuthenticated } = props
  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage className="about-page" title={'About Page'} />
    </BaseLayout>
  )
}

export default About
