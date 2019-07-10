const mongoose = require('mongoose')
const Schema = mongoose.Schema

const setStringType = (required, maxlength) => {
  type: String, required, maxlength
}

const portfolioSchema = new Schema(
  {
    userId: { type: String, required: true, maxlength: 512 },
    title: { type: String, required: true, maxlength: 512 },
    company: { type: String, required: true, maxlength: 512 },
    location: { type: String, required: true, maxlength: 512 },
    position: { type: String, required: true, maxlength: 512 },
    description: { type: String, required: true, maxlength: 512 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  {
    // versionKey: false
  }
)

const portfolioModel = mongoose.model('Portfolio', portfolioSchema)

module.exports = portfolioModel
