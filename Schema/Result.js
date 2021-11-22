const mongoose = require('mongoose')

const ResultSchema = new mongoose.Schema({
  userid:{type:String, require:true},
  user:{type:Object,require:true},
  tests:{type:Array,require:true},
},
{timestamps:true})
module.exports = mongoose.model('Result',ResultSchema)