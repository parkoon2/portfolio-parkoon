import React from 'react'
import DatePicker from 'react-datepicker'
import { FormGroup, Label, Button } from 'reactstrap'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class PortDatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultValue: new Date(),
      isHidden: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  setFieldValueAndTouched = (date, touched) => {
    const { setFieldValue, setFieldTouched, field } = this.props
    setFieldValue(field, date, true)
    setFieldTouched(field, touched, true)
  }

  handleChange(date) {
    this.setState({
      defaultValue: date
    })

    this.setFieldValueAndTouched(date, true)
  }

  toggleDate = date => {
    this.setState({
      isHidden: !this.state.isHidden
    })

    this.setFieldValueAndTouched(date, true)
  }

  render() {
    const { isHidden, defaultValue } = this.state
    const { canBeDisabled } = this.props
    return (
      <>
        {!isHidden && (
          <DatePicker
            selected={this.state.defaultValue}
            onChange={this.handleChange}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            maxDate={new Date()}
            dropdownMode="select"
          />
        )}
        {canBeDisabled && !isHidden && (
          <Button
            onClick={() => {
              this.toggleDate(null)
            }}
          >
            OFF
          </Button>
        )}

        {canBeDisabled && isHidden && (
          <Button
            onClick={() => {
              this.toggleDate(defaultValue)
            }}
          >
            ON
          </Button>
        )}
      </>
    )
  }
}
