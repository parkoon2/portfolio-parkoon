// Render Prop
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const validate = val => {
  let errors = {}
  // if (!values.email) {
  //   errors.email = 'Required'
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }
  return errors
}

const InitialValue = {
  title: '',
  company: '',
  location: '',
  position: '',
  description: '',
  startDate: '',
  endDate: ''
}

const PortfolioCreateForm = () => (
  <div>
    <Formik
      initialValues={InitialValue}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label>Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label>Company</label>
            <Field type="text" name="company" />
            <ErrorMessage name="company" component="div" />
          </div>

          <div>
            <label>Location</label>
            <Field type="text" name="location" />
            <ErrorMessage name="location" component="div" />
          </div>

          <div>
            <label>Position</label>
            <Field type="text" name="position" />
            <ErrorMessage name="position" component="div" />
          </div>

          <div>
            <label>Description</label>
            <Field type="textarea" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>

          <div>
            <label>Start Date</label>
            <Field type="text" name="startDate" component="textarea" />
            <ErrorMessage name="startDate" component="div" />
          </div>

          <div>
            <label>End Date</label>
            <Field type="text" name="endDate" />
            <ErrorMessage name="endDate" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Create
          </button>
        </Form>
      )}
    </Formik>
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
//         <label>
//           title:
//           <input
//             name="title"
//             type="text"
//             value={this.state.title}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label>
//           description:
//           <textarea
//             name="description"
//             type="text"
//             value={this.state.description}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label>
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
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     )
//   }
// }
