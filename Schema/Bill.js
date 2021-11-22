const mongoose = require('mongoose')

const BillSchema = new mongoose.Schema({
  user: { type: Object, require: true },
  tests: { type: Array, require: true }, 
  total: { type: Number, require: true }, 
  done: { type: Boolean, default: false },
  insurance: { type: String, default: '' },
  insuranceNumber : {type:Number}
},
{timestamps:true}
)

module.exports = mongoose.model('Bill', BillSchema);