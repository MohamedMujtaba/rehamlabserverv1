const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
  testName: { type: String, require: true },
  normal: { type: Object, require: true },
  comments: { type: String },
  price: { type: Number, require: true },
  subTest: { type: Array }
},
  { timestamps: true }
)

module.exports = mongoose.model('Test', TestSchema);