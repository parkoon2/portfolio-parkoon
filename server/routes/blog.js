const express = require('express')
const router = express.Router()

const blogController = require('../controllers/blog')

// 순서 중요함! /:id 먼저 나오면 /me 를 절대 탈 수 없음!
router.get('/', blogController.getBlogs)
router.get('/me', blogController.getUserBlogs)
router.get('/:id', blogController.getBlogById)
router.get('/slug/:slug', blogController.getBlogBySlug)
router.post('/', blogController.createBlog)
router.delete('/:id', blogController.deleteBlog)
router.patch('/:id', blogController.updateBlog)

module.exports = router
