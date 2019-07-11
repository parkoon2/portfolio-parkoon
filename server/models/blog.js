const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  userId: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true }
})

module.exports = mongoose.model('Blog', blogSchema)
