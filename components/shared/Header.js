import Link from 'next/link'

class Header extends React.Component {
  render() {
    const title = this.props.title
    return (
      <>
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

        <style jsx>
          {`
            a {
              font-size: 20px;
            }
            .customClass {
              color: red;
            }
          `}
        </style>
      </>
    )
  }
}

export default Header
