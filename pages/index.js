import Header from '../components/shared/Header'
import BaseLayout from '../components/layouts/BaseLayout'
import axios from 'axios'

const Index = props => {
  console.log('========= LOG START =======')
  console.log(props)
  console.log('========= LOG END =========')

  return (
    <BaseLayout>
      <h1>{JSON.stringify(props)} </h1>
    </BaseLayout>
  )
}

Index.getInitialProps = async () => {
  let res
  try {
    res = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  } catch (err) {
    console.error(err)
  }
  return {
    initialData: [1, 2, 3, 4],
    todo: res.data
  }
}
export default Index
