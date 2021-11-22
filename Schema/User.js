const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name:{type:String,require:true},
  address:{type:String,require:true},
  age:{type:Number,require:true},
  gender: { type: String, require: true },
  phone:{type:Number,require:true},

},{timestamps:true})

module.exports = mongoose.model('User', UserSchema);