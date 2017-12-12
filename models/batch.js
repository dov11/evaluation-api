const mongoose = require('../config/database')
const { Schema } = mongoose

const performanceCodeSchema = new Schema({
  colorCode: { type: String, required: false },
  evaluationDate: { type: Date, required: false },
  comment: {type: String, required: false}
})

const studentSchema = new Schema({
  firstName: { type: String, required: true }, // in minutes
  lastName: { type: String, required: true },
  linkToPhoto: { type: String, required: true },
  performanceCodes: [performanceCodeSchema]
})

const batchSchema = new Schema({
  batchNumber: { type: Number},
  startDate: { type: Date},
  endDate: { type: Date},
  students: [studentSchema],
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('batches', batchSchema)
