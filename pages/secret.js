import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import withAuth from '../components/hoc/withAuth'
import axios from 'axios'
class Secret extends React.Component {
  state = {
    secretData: []
  }

  static getInitialProps = () => {
    const foo = 'bar'
    return {
      foo
    }
  }

  async componentDidMount() {
    const res = await axios.get('/api/v1/secret')
    console.log('========= LOG START =======')
    console.log(res.data)
    console.log('========= LOG END =========')
    const secretData = res.data

    this.setState({
      secretData
    })
  }

  renderSecretData = () => {
    const { secretData } = this.state

    if (!secretData) return null

    return secretData.map((data, index) => {
      return (
        <div key={index}>
          <h2>{data.title}</h2>
          <h2>{data.description}</h2>
        </div>
      )
    })
  }

  render() {
    return (
      <BasePage>
        <h1>Secret Page</h1>
        <span>{this.props.foo}</span>
        {this.renderSecretData()}
      </BasePage>
    )
  }
}
export default withAuth(Secret)
