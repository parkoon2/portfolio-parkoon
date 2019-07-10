const Portfolio = require('../models/portfolio')

exports.getPortfolioById = (req, res) => {
  const portfolioId = req.params.id

  Portfolio.findById(portfolioId)
    .select('-__v')
    .exec((err, foundPortfolio) => {
      if (err) return res.status(422).json(err)

      return res.json(foundPortfolio)
    })
}

exports.getPortfolios = (req, res) => {
  Portfolio.find({}, (err, foundPortfolios) => {
    if (err) return res.status(422).json(err)

    return res.json(foundPortfolios)
  })
}

exports.createPortfolio = (req, res) => {
  const portfolioData = req.body

  const portfolio = new Portfolio(portfolioData)

  portfolio.save((err, savedPortfolio) => {
    console.log('server error')
    console.error(err)
    if (err) return res.status(442).json(err)

    return res.json(savedPortfolio)
  })
}

exports.deletePortfolio = (req, res) => {
  const portfolioId = req.params.id

  Portfolio.remove({ _id: portfolioId }, err => {
    if (err) return res.status(442).json(err)

    res.json({ message: 'portfolio deleted successfully' })
  })
}

exports.updatePortfolio = (req, res) => {
  const portfolioId = req.params.id
  const portfolioData = req.body

  Portfolio.findById(portfolioId, (err, foundPortfolio) => {
    if (err) return res.status(442).json(err)
    if (!foundPortfolio)
      return res.status(404).json({ message: 'portfolio not found' })

    foundPortfolio.set(portfolioData)

    foundPortfolio.save((err, savedPortfolio) => {
      if (err) return res.status(442).json(err)
      return res.json(savedPortfolio)
    })
  })
}
