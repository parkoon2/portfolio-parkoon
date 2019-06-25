import Link from 'next/link'

import '../../styles/main.scss'
class Header extends React.Component {
  render() {
    const title = this.props.title
    return (
      <>
        <p className="customClass"> I am styled P element </p>
        <p className="customClassFromFile"> I am styled P element </p>
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
