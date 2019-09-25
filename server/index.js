const express = require('express')
const next = require('next')
const routes = require('../routes')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)
const mongoose = require('mongoose')
const config = require('./config')
const morgan = require('morgan')
const compression = require('compression')

const Book = require('./models/book')

// Router
const bookRouter = require('./routes/book')
const portfolioRouter = require('./routes/portfolio')
const blogRouter = require('./routes/blog')

const secretData = [
  {
    title: 'secret data 1',
    description: 'Buy something'
  },
  {
    title: 'secret data 2',
    description: 'Eat something'
  }
]

console.log(process.env)

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Database connected')
  })
  .catch(err => console.error(err))

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(express.json())
    server.use(compression())
    // server.use(morgan('combined'))

    server.use('/api/v1/books', bookRouter)
    server.use('/api/v1/portfolios', portfolioRouter)
    server.use('/api/v1/blogs', blogRouter)

    server.get('/api/v1/secret', (req, res) => {
      return res.json(secretData)
    })

    const PORT = process.env.PORT || 3000

    server.use(handle).listen(PORT, err => {
      if (err) throw err
      console.log('> Ready on ' + PORT)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
