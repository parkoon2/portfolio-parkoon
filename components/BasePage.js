import { Container } from 'reactstrap'

const BasePage = props => {
  const className = props.className || ''

  return (
    <div className={`base-page ${className}`}>
      <Container>{props.children}</Container>
    </div>
  )
}

export default BasePage
