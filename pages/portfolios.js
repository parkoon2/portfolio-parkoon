import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import axios from 'axios'
// import Link from 'next/link'
import { Link } from '../routes'

const Portfolios = props => {
  const { posts } = props
  console.log(posts)
  return (
    <BasePage>
      <h1>Portfolio Page</h1>
      <ul>
        {posts.map(post => (
          <Link key={post.id} route={`/portfolio/${post.id}`}>
            {/* <Link
            key={post.id}
            as={`/portfolio/${post.id}`}
            href={`/portfolio?id=${post.id}`}
          > */}
            <a style={{ fontSize: '20px', display: 'flex' }}> {post.title} </a>
          </Link>
        ))}
      </ul>
    </BasePage>
  )
}

Portfolios.getInitialProps = async () => {
  let posts = []
  try {
    let res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    posts = res.data
  } catch (err) {
    console.error(err)
  }
  return {
    posts
  }
}

export default Portfolios
