const Blog = require('../models/blog')

exports.createBlog = (req, res) => {
  const blogData = req.body

  const blog = new Blog(blogData)

  // TODO: 유저 추가!
  /**
   * ex
   *
   * if (req.user) {
   *    blog.userId = user.id
   *    blog.author = user.name
   * }
   */

  blog.save((err, savedBlog) => {
    if (err) return res.status(422).send(err)

    return res.json(savedBlog)
  })
}
