// Render Prop
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const PortfolioCreateForm = () => (
  <div>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        let errors = {}
        if (!values.email) {
          errors.email = 'Required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
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
