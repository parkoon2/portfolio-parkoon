const express = require('express')
const router = express.Router()
const portfolioController = require('../controllers/portfolio')

router.post('/', portfolioController.createPortfolio)
router.get('/', portfolioController.getPortfolios)
router.patch('/:id', portfolioController.updatePortfolio)
router.delete('/:id', portfolioController.deletePortfolio)
module.exports = router
