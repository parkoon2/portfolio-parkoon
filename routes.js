const routes = require('next-routes')

module.exports = routes()
  .add('portfolioEdit', '/portfolios/:id/edit')
  .add('portfolioNew', '/portfolioNew')
  .add('blogEditorUpdate', '/blogs/:id/edit')
// .add('blogEditorUpdate', '/blogs/:id/edit')
