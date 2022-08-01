//import 
const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  // username: { type: String, required: true, },
  date: { type: Date, default: Date.now },
});



module.exports = mongoose.model("post", postSchema);