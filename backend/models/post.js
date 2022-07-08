//import 
const mongoose = require("mongoose");

//Schéma de données
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  // username: { type: String, required: true },
  message: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  
});



module.exports = mongoose.model("post", postSchema);