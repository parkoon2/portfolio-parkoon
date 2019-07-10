import React, { Component } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button
} from 'reactstrap'

import { Router } from '../../routes'
import PortfolioCardDetail from './PortfolioCardDetail'

export default class PortfolioCard extends Component {
  render() {
    const { portfolio, children } = this.props

    return (
      <>
        <PortfolioCardDetail />

        <Card className="portfolio-card">
          <CardHeader className="portfolio-card-header" data-id={portfolio._id}>
            {portfolio.position}
          </CardHeader>
          <CardBody>
            <p className="portfolio-card-city">{portfolio.location}</p>
            <CardTitle className="portfolio-card-title">
              {portfolio.title}
            </CardTitle>
            <CardText className="portfolio-card-text">
              {portfolio.discription}
            </CardText>
            <div className="readMore">{children}</div>
          </CardBody>
        </Card>
      </>
    )
  }
}
