const express = require('express')
const router = express.Router()

const Book = require('../models/book')

router.post('/', (req, res) => {
  const bookData = req.body
  const book = new Book(bookData)

  book.save((err, result) => {
    if (err) return res.status(422).json(err)

    return res.json(result)
  })
})

router.get('/', (req, res) => {
  Book.find({}, (err, foundBooks) => {
    if (err) return res.status(422).json(err)

    return res.json(foundBooks)
  })
})

router.patch('/:id', (req, res) => {
  const bookId = req.params.id
  const { title } = req.body

  Book.findById(bookId, (err, foundBook) => {
    if (err) return res.status(422).json(err)
    if (!foundBook) return res.status(404).json({ message: 'book not found' })

    if (title) foundBook.title = title

    foundBook.save((err, savedBook) => {
      if (err) return res.status(422).json(err)

      return res.json(savedBook)
    })
  })
})

router.delete('/:id', (req, res) => {
  const bookId = req.params.id

  Book.remove({ _id: bookId }, (err, foundBook) => {
    if (err) return res.status(422).json(err)

    return res.json({ message: 'success' })
  })
})

module.exports = router
