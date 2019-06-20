import Link from 'next/link'

const Index = () => {
  return (
    <>
      <h1>Index page </h1>
      <Link href="/">
        <a> Home </a>
      </Link>
      <Link href="/about">
        <a> About </a>
      </Link>
      <Link href="/portfolios">
        <a> Portfolio </a>
      </Link>
      <Link href="/blogs">
        <a> Blog </a>
      </Link>
      <Link href="/cv">
        <a> CV </a>
      </Link>
    </>
  )
}
export default Index
