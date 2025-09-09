const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  id: {
    type: Number,
    required: [true, "ID IS REQUIRED"],
  },
  text: String,
  rating: Number,
});

module.exports = mongoose.model("Review", reviewSchema);
