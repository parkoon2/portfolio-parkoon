const express = require('express')
const router = express.Router()

const blogController = require('../controllers/blog')

// 순서 중요함! /:id 먼저 나오면 /me 를 절대 탈 수 없음!
router.get('/me', blogController.getUserBlogs)
router.get('/:id', blogController.getBlogById)

router.post('/', blogController.createBlog)
router.patch('/:id', blogController.updateBlog)

module.exports = router
