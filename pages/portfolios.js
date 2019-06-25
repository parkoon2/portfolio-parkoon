import BaseLayout from '../components/layouts/BaseLayout'
import axios from 'axios'
import Link from 'next/link'

const Portfolios = props => {
  const { posts } = props

  return (
    <BaseLayout>
      <h1>Portfolio Page</h1>
      <ul>
        {posts.map(post => (
          <Link
            key={post.id}
            as={`/portfoli/${post.id}`}
            href={`/portfolio?title=${post.title}`}
          >
            <a style={{ fontSize: '20px', display: 'flex' }}> {post.title} </a>
          </Link>
        ))}
      </ul>
    </BaseLayout>
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
