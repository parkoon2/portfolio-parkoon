const express = require('express')
const router = express.Router()

const blogController = require('../controllers/blog')

router.post('/', blogController.createBlog)
router.get('/:id', blogController.getBlogById)
router.patch('/:id', blogController.updateBlog)

module.exports = router
