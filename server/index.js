const express = require('express')
const next = require('next')
const routes = require('../routes')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)
const mongoose = require('mongoose')
const config = require('./config')

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

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Database connected')
  })
  .catch(err => console.error(err))

app
  .prepare()
  .then(() => {
    const server = express()
    console.log('prepared')
    // server.get('/portfolio/:id', (req, res) => {
    //   console.log('------- Serving /portfolio/:id request -------')
    //   const actualPage = '/portfolio'
    //   const queryParams = { id: req.params.id }
    //   app.render(req, res, actualPage, queryParams)
    // })

    // server.get('*', (req, res) => {
    //   console.log('------- Serving all of the request -------')
    //   return handle(req, res)
    // })

    server.get('/api/v1/secret', (req, res) => {
      return res.json(secretData)
    })

    server.use(handle).listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
