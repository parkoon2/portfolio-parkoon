import BaseLayout from '../components/layouts/BaseLayout'
import { Button, Container, Row, Col } from 'reactstrap'
import Typed from 'react-typed'

class Index extends React.Component {
  state = {
    isFlipping: false
  }
  roles = [
    'Developer',
    'Tech Lover',
    'Team Player',
    'Course Creater',
    'React.js'
  ]

  componentDidMount() {
    this.animateCard()
  }

  // TODO: 이거 뭐임...?
  componentWillLeave() {
    // this.cardAnimationInterval && clearInterval(this.cardAnimationInterval)
  }

  componentWillUnmount() {
    this.cardAnimationInterval && clearInterval(this.cardAnimationInterval)
  }

  animateCard = () => {
    this.cardAnimationInterval = setInterval(() => {
      this.setState({
        isFlipping: !this.state.isFlipping
      })
    }, 3000)
  }

  render() {
    const { isAuthenticated, user } = this.props
    const { isFlipping } = this.state

    return (
      <BaseLayout
        className="cover"
        isAuthenticated={isAuthenticated}
        headerType="index"
      >
        <div className="main-section">
          <div className="background-image">
            <img
              alt="Portfolio Land page bakcground image"
              src="/static/images/background-index.png"
            />
          </div>

          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img
                        alt="Portfolio Land page bakcground image"
                        className="image"
                        src="/static/images/section-1.png"
                      />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    {isAuthenticated && (
                      <span>
                        {' '}
                        <b>{user.name}</b>{' '}
                      </span>
                    )}
                    Welcome to the portfolio website of Filip Jerga. Get
                    informed, collaborate and discover projects I was working on
                    through the years!
                  </h1>
                </div>

                <Typed
                  loop
                  typeSpeed={66}
                  backSpeed={66}
                  strings={this.roles}
                  smartBackspace
                  shuffle={false}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  cursorChar="|"
                  className="self-typed"
                />
                <div className="hero-welcome-bio">
                  <h1>Let's take a look on my work.</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    )
  }
}

export default Index
