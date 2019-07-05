import React from 'react'

export default class PortfolioCreateForm extends React.Component {
  state = {
    title: '',
    description: '',
    language: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = event => {
    console.log('A name was submitted: ', this.state)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          title:
          <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </label>
        <label>
          description:
          <textarea
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </label>
        <label>
          language:
          <select
            name="language"
            value={this.state.languate}
            onChange={this.handleChange}
          >
            <option value="javascript">Javascript</option>
            <option value="react">React</option>
            <option value="react-native">React Native</option>
            <option value="mongodb">MongoDB</option>
            <option value="webrtc">WebRTC</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
