const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  userId: { type: String, required: [true, '이렇게도 할 수 있지롱'] },
  slug: { type: String, unique: true, sparse: true }, // what is spase...?
  title: { type: String, required: true, maxlength: 96 },
  subTitle: { type: String, required: true },
  story: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'draft' },
  author: { type: String, required: true }
})

module.exports = mongoose.model('Blog', blogSchema)
