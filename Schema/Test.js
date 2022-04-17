const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema(
  {
    testName: { type: String, require: true },
    comments: { type: String },
    price: { type: Number, default: 0 },
    subTest: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", TestSchema);
