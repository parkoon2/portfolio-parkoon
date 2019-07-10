// Render Prop
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FormGroup, Label, Input, FormText, Button } from 'reactstrap'
import PortDatePicker from '../forms/PortDatePicker'
import moment from 'moment'

const validate = values => {
  let errors = {}
  Object.entries(values).forEach(([key, value]) => {
    if (key === 'startDate' || key === 'endDate') return
    if (!value) {
      errors[key] = `${key} is required`
    }
  })

  const startDate = moment(values.startDate)
  const endDate = moment(values.endDate)

  if (startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = 'End Date cannog be before start date'
  }

  return errors
}

const PortfolioCreateForm = ({ onSubmit, initialValue }) => (
  <div>
    <Formik
      initialValues={initialValue}
      validate={validate}
      onSubmit={onSubmit}
      render={props => {
        return (
          <Form>
            <FormGroup>
              <Label>Title</Label>
              <Field className="form-control" type="text" name="title" />
              <ErrorMessage name="title" component="div" />
            </FormGroup>
            <FormGroup>
              <Label>Company</Label>
              <Field className="form-control" type="text" name="company" />
              <ErrorMessage name="company" component="div" />
            </FormGroup>

            <FormGroup>
              <Label>Location</Label>
              <Field className="form-control" type="text" name="location" />
              <ErrorMessage name="location" component="div" />
            </FormGroup>

            <FormGroup>
              <Label>Position</Label>
              <Field className="form-control" type="text" name="position" />
              <ErrorMessage name="position" component="div" />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <Field
                className="form-control"
                type="textarea"
                name="description"
              />
              <ErrorMessage name="description" component="div" />
            </FormGroup>
            <FormGroup>
              <Label>Start Date</Label>
              {/* <Field type="text" name="startDate" component="div" /> */}
              <PortDatePicker field="startDate" {...props} />
              <ErrorMessage name="startDate" component="div" />
            </FormGroup>

            <FormGroup>
              <Label>End Date</Label>
              <PortDatePicker field="endDate" {...props} canBeDisabled={true} />
              <ErrorMessage name="endDate" component="div" />
              {/* <Field type="text" name="endDate" /> */}
            </FormGroup>

            <Button
              color="success"
              size="lg"
              type="submit"
              disabled={props.isSubmitting}
            >
              Create
            </Button>
          </Form>
        )
      }}
    />
  </div>
)

export default PortfolioCreateForm
// import React from 'react'

// export default class PortfolioCreateForm extends React.Component {
//   state = {
//     title: '',
//     description: '',
//     language: ''
//   }

//   handleChange = event => {
//     this.setState({ [event.target.name]: event.target.value })
//   }
//   handleSubmit = event => {
//     console.log('A name was submitted: ', this.state)
//     event.preventDefault()
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <Label>
//           title:
//           <input
//             name="title"
//             type="text"
//             value={this.state.title}
//             onChange={this.handleChange}
//           />
//         </Label>
//         <Label>
//           description:
//           <textarea
//             name="description"
//             type="text"
//             value={this.state.description}
//             onChange={this.handleChange}
//           />
//         </Label>
//         <Label>
//           language:
//           <select
//             name="language"
//             value={this.state.languate}
//             onChange={this.handleChange}
//           >
//             <option value="javascript">Javascript</option>
//             <option value="react">React</option>
//             <option value="react-native">React Native</option>
//             <option value="mongodb">MongoDB</option>
//             <option value="webrtc">WebRTC</option>
//           </select>
//         </Label>
//         <input type="submit" value="Submit" />
//       </form>
//     )
//   }
// }
