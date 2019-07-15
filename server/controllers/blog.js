const Blog = require('../models/blog')

var AsyncLock = require('async-lock')
var lock = new AsyncLock()

exports.getUserBlogs = (req, res) => {
  const userId = 'parkoon'

  Blog.find({ userId }, (err, foundBlogs) => {
    if (err) return res.status(422).send(err)

    res.json(foundBlogs)
  })
}

exports.createBlog = (req, res) => {
  const blogData = req.body
  const lockId = req.query.lockId
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

  if (!lock.isBusy(lockId)) {
    lock.acquire(
      lockId,
      done => {
        // Concurrency safe
        blog.save((err, savedBlog) => {
          done()

          if (err) return res.status(422).send(err)

          return res.json(savedBlog)
        })
      },
      (err, ret) => {
        err && console.error(err)
      }
    )
  }
}

exports.updateBlog = (req, res) => {
  const blogId = req.params.id
  const newBlog = req.body

  Blog.findByIdAndUpdate(blogId, { $set: newBlog }, (err, updatedBlog) => {
    if (err) return res.status(422).send(err)
    res.json(updatedBlog)
    console.log('========= LOG START =======')
    console.log(updatedBlog)
    console.log('========= LOG END =========')
  })
}

exports.getBlogById = (req, res) => {
  const blogId = req.params.id

  Blog.findById(blogId, (err, foundBlog) => {
    if (err) return res.status(422).send(err)

    return res.json(foundBlog)
  })
}
